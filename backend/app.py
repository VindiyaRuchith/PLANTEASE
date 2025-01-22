from flask import Flask, request, jsonify
import os
import numpy as np
import cv2
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
import tensorflow as tf
from PIL import Image
import base64
from io import BytesIO
from flask_cors import CORS

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Load the trained model
model = load_model(r"C:\Users\Vindiya\Desktop\PLANT-EASE\backend\models\cinnamon_model.h5")

# Load class names
class_names = ['healthy_cinnamon', 'leaf_spot_disease', 'rough_bark', 'stripe_canker']

def preprocess_image(image_path, image_size=(224, 224)):
    """Preprocess the image for prediction."""
    img = image.load_img(image_path, target_size=image_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0
    return img_array

def get_hires_cam(model, img_array, class_index):
    """Generate a clearer heatmap using HiResCAM."""
    # Ensure this matches your model's last conv layer
    last_conv_layer_name = "conv2d_3"
    last_conv_layer = model.get_layer(last_conv_layer_name)

    # Create the GradCAM model
    grad_model = tf.keras.models.Model(
        [model.inputs], [last_conv_layer.output, model.output]
    )

    with tf.GradientTape() as tape:
        conv_outputs, predictions = grad_model(img_array)
        loss = predictions[:, class_index]

    # Compute gradients
    grads = tape.gradient(loss, conv_outputs)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))  # Average pooling

    # Generate heatmap
    conv_outputs = conv_outputs[0]
    heatmap = tf.reduce_sum(tf.multiply(pooled_grads, conv_outputs), axis=-1)

    # Normalize the heatmap
    heatmap = np.maximum(heatmap, 0)  # ReLU activation
    heatmap /= np.max(heatmap) if np.max(heatmap) != 0 else 1  # Avoid division by zero
    heatmap = cv2.resize(heatmap, (224, 224))  # Resize to match input image dimensions

    return heatmap


@app.route('/predict', methods=['POST'])
def predict():
    """Endpoint for predicting and generating heatmaps."""
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    img_path = os.path.join('uploads', file.filename)
    file.save(img_path)

    # Preprocess the image
    img_array = preprocess_image(img_path)

    # Predict the class probabilities
    predictions = model.predict(img_array)
    results = {
        "healthy_cinnamon": float(predictions[0][0]),
        "leaf_spot_disease": float(predictions[0][1]),
        "rough_bark": float(predictions[0][2]),
        "stripe_canker": float(predictions[0][3])
    }

    # Get the class with the highest probability
    class_index = np.argmax(predictions)
    class_name = class_names[class_index]
    results["predicted_class"] = class_name

    # Generate HiResCAM heatmap
    try:
        heatmap = get_hires_cam(model, img_array, class_index)

        # Load the original image for overlay
        original_image = cv2.imread(img_path)
        original_image = cv2.resize(original_image, (224, 224))

        # Convert the heatmap to 8-bit and apply color map
        heatmap = np.uint8(255 * heatmap)
        heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)

        # Overlay the heatmap on the original image
        superimposed_image = cv2.addWeighted(original_image, 0.6, heatmap, 0.4, 0)

        # Add the predicted class name to the image
        label = f"{class_name}"
        cv2.putText(
            superimposed_image, label, (10, 30), 
            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1
        )

        # Convert the final image to base64
        img_pil = Image.fromarray(cv2.cvtColor(superimposed_image, cv2.COLOR_BGR2RGB))
        buffered = BytesIO()
        img_pil.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')

        results["heatmap"] = img_str

    except Exception as e:
        return jsonify({"error": f"Error generating heatmap: {str(e)}"}), 500

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
