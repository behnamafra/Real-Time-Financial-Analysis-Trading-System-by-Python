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
            await websocket.send(json.dumps(data))
        except websockets.exceptions.ConnectionClosed:
            # Handle the case where a connection is closed
            # test comment
            pass

async def start_trading_signal_consumer():
    consumer_config = {
        'bootstrap.servers': 'localhost:9092',  # Replace with your Kafka bootstrap servers
        'group.id': 'analyzed-data-group',       # Consumer group ID
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
            stock_symbol = msg.value().decode('utf-8')  # Assuming data is sent as UTF-8 string
            print(f"Received analyzed data for stock: {stock_symbol}")

            # Send the data to all connected WebSocket clients
            await send_data_to_websocket({'stock_symbol': stock_symbol})

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
