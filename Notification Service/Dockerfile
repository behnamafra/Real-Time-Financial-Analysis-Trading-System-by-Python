# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Python scripts and requirements file into the container
COPY main_notification.py /app/
COPY websocket_server.py /app/
COPY kafka_consumer.py /app/
COPY json_serializer.py /app/
COPY requirements.txt /app/

# Install any dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Run the Python script when the container starts
CMD ["python", "main_notification.py"]
