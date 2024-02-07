import asyncio
from confluent_kafka import Consumer, KafkaException
import json
from websocket_server import send_data_to_websocket

async def start_trading_signal_consumer():
    consumer_config = {
        'bootstrap.servers': 'localhost:9092',  # Replace with your Kafka bootstrap servers
        'group.id': 'consumer_group',       # Consumer group ID
        'auto.offset.reset': 'earliest',         # Start reading from the beginning of the topic
    }

    consumer = Consumer(consumer_config)

    # Subscribe to the Kafka topic
    consumer.subscribe(['notification'])  # Replace with your Kafka topic

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
            
            print(f"Received analyzed data for stock: {data_list}")

            # Send the data to all connected WebSocket clients
            await send_data_to_websocket(data_list)
    finally:
        # Close the Kafka consumer on exit
        consumer.close()
