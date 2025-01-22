import pandas as pd
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.layers import Input, Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.models import Model
import os


# Loading the CSV file and the Image folder
csv_path = r'C:\Users\Vindiya\Desktop\Dataset For FYP\train\_classes.csv'
imagefolder_path = r'C:\Users\Vindiya\Desktop\Dataset For FYP\train'

# Load CSV file
df = pd.read_csv(csv_path)

# Fixing column names (removing leading/trailing spaces)
df.rename(columns=lambda x: x.strip(), inplace=True)

# Adding the full image path
df['csv_path'] = df['filename'].apply(lambda x: os.path.join(imagefolder_path, x))

# Labels (without spaces)
y_col = ['healthy_cinnamon', 'leaf_spot_disease', 'rough_bark', 'stripe_canker']

# Defining Image Size and Batch Size
IMG_SIZE = (224, 224)
BATCH_SIZE = 32

# Data Preprocessing (ImageDataGenerator)
datagen = ImageDataGenerator(
    rescale=1.0 / 255,  # Normalize pixel values to [0, 1]
    validation_split=0.2  # Reserve 20% for validation
)

# Validate that all image files exist
df = df[df['csv_path'].apply(os.path.exists)]
if df.empty:
    raise ValueError("No valid image files found in the specified paths!")

# Training Data Generator
train_generator = datagen.flow_from_dataframe(
    dataframe=df,
    x_col='csv_path',
    y_col=y_col,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='raw',  # Multi-label output
    subset='training',  # Training data
    shuffle=True
)

# Validation Data Generator
validation_generator = datagen.flow_from_dataframe(
    dataframe=df,
    x_col='csv_path',
    y_col=y_col,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='raw',  # Multi-label output
    subset='validation',  # Validation data
    shuffle=False
)

# Functional Model Definition
input_layer = Input(shape=(224, 224, 3))  # Input layer

x = Conv2D(32, (3, 3), activation='relu', name='conv2d_1')(input_layer)
x = MaxPooling2D((2, 2))(x)
x = Conv2D(64, (3, 3), activation='relu', name='conv2d_2')(x)
x = MaxPooling2D((2, 2))(x)
x = Conv2D(128, (3, 3), activation='relu', name='conv2d_3')(x)
x = MaxPooling2D((2, 2))(x)

x = Flatten()(x)
x = Dense(128, activation='relu', name='dense_1')(x)
x = Dropout(0.5)(x)

output_layer = Dense(4, activation='sigmoid', name='output')(x)  # Output layer for 4 labels

# Create the Functional model
model = Model(inputs=input_layer, outputs=output_layer)

# Compile Model
model.compile(
    optimizer='adam',             # Adaptive optimization algorithm
    loss='binary_crossentropy',   # For multi-label classification
    metrics=['accuracy']          # Metric for evaluation
)

# Train the Model
result = model.fit(
    train_generator,  # Training data
    validation_data=validation_generator,  # Validation data
    epochs=10,  # Number of passes over the dataset
    verbose=1  # Show training progress
)

# Save the Model
model.save(r"C:\Users\Vindiya\Desktop\PLANT-EASE\backend\models\cinnamon_model.h5")

# Test saved model
from tensorflow.keras.models import load_model
loaded_model = load_model(r"C:\Users\Vindiya\Desktop\PLANT-EASE\backend\models\cinnamon_model.h5")
print(loaded_model.summary())
