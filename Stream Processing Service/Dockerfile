# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Python scripts and configuration files into the container
COPY main_processing_data_consumer.py /app/
COPY data_processing.py /app/
COPY kafka_setup.py /app/
COPY requirements.txt /app/

# Install any dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Run the Python script when the container starts
CMD ["python", "main_processing_data_consumer.py"]
