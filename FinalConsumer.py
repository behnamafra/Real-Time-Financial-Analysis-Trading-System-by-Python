import asyncio
import threading
import websockets
from confluent_kafka import Consumer, KafkaException
import json
from flask import Flask, render_template, request

app = Flask(__name__)

connected_clients = set()

async def send_data_to_websocket(data):
    # Get all connected clients and send data to each one
    for websocket in connected_clients:
        try:
            # Use custom_json_serializer to handle serialization
            await websocket.send(json.dumps(data, default=custom_json_serializer))
        except websockets.exceptions.ConnectionClosed:
            # Handle the case where a connection is closed
            pass
def custom_json_serializer(obj):
    if isinstance(obj, float):
        # Preserve the original float value as a string
        return f"{obj}"
    return obj

async def start_trading_signal_consumer():
    consumer_config = {
        'bootstrap.servers': 'localhost:9092',  # Replace with your Kafka bootstrap servers
        'group.id': 'consumer_group',       # Consumer group ID
        'auto.offset.reset': 'earliest',         # Start reading from the beginning of the topic
    }

    consumer = Consumer(consumer_config)

    # Subscribe to the Kafka topic
    consumer.subscribe(['analyzed-data'])  # Replace with your Kafka topic

    try:
        while True:
            # Poll for messages
            msg = consumer.poll(1000)  # Adjust the timeout as needed

            if msg is None:
                continue
            if msg.error():
                if msg.error().code() == KafkaException._PARTITION_EOF:
                    # End of partition event, not an error
                    continue
                else:
                    # Handle other errors
                    print(msg.error())
                    break

            # Process the received message
            data_list = json.loads(msg.value())
            print(f"adsdsdsdsd: {json.loads(msg.value())}")
            #for data in data_list:
            print(f"Received analyzed data for stock: {data_list}")

            # Send the data to all connected WebSocket clients
            await send_data_to_websocket(data_list)
            
            
            
            
    finally:
        # Close the Kafka consumer on exit
        consumer.close()

async def consumer_handler(websocket, path):
    # Add the connected WebSocket client to the set
    connected_clients.add(websocket)

    try:
        while True:
            await asyncio.sleep(1)
    finally:
        # Remove the WebSocket client when the connection is closed
        connected_clients.remove(websocket)

def start_websocket_server():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    
    start_server = websockets.serve(consumer_handler, "localhost", 3000)
    loop.run_until_complete(start_server)
    loop.run_forever()

if __name__ == "__main__":
    # Start the WebSocket server in a separate thread
    websocket_thread = threading.Thread(target=start_websocket_server)
    websocket_thread.start()

    # Start the Kafka consumer
    asyncio.get_event_loop().run_until_complete(start_trading_signal_consumer())
