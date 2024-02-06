from kafka_setup import consumer
from confluent_kafka import KafkaError,Consumer
from data_processing import process_data
import json

if __name__ == "__main__":
    print("data subscribed")
    while True:
        msg = consumer.poll(timeout=1000)  # 1-second timeout
        if msg is None:
            continue
        if msg.error():
            if msg.error().code() == KafkaError._PARTITION_EOF:
                continue
            else:
                print(f'Error: {msg.error()}')
                break
        data = json.loads(msg.value())
        print(f"data is :\n{data}")
        process_data(msg)
