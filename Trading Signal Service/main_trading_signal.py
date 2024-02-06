from confluent_kafka import Consumer, KafkaError
from data_processing_signal import generate_signals
import pandas as pd
import json

def process_analyzed_data(message):
    # Implement processing logic for buy/sell signals
    data = json.loads(message.value())
    
    # Convert the data to a JSON string
    json_data = json.dumps(data)
    
    # Read the JSON data into a DataFrame
    analyzed_data = pd.read_json(json_data, orient='records')

    # Your buy/sell signal generation logic goes here
    for index, row in analyzed_data.iterrows():
        # Example of a simple buy/sell signal logic
        if row['moving_average'] > row['closing_price'] and row['rsi'] < 30:
            signal = 'Buy'
        elif row['moving_average'] < row['closing_price'] and row['rsi'] > 70:
            signal = 'Sell'
        else:
            signal = 'Hold'

        # Append the signal to the DataFrame
        analyzed_data.at[index, 'signal'] = signal

        # You can also print or log the signals
        print(f"Signal for {row['stock_symbol']} at {row['timestamp']}: {signal}")

    # Now you can do further processing or actions based on these signals

if __name__ == "__main__":
    # Kafka consumer configuration for analyzed data
    consumer_config_analyzed_data = {
        'bootstrap.servers': 'localhost:9092',
        'group.id': 'consumer_group_analyzed_data',
        'auto.offset.reset': 'earliest'
    }

    # Kafka consumer for analyzed data
    consumer_analyzed_data = Consumer(consumer_config_analyzed_data)
    consumer_analyzed_data.subscribe(['signal-generat'])

    # Process incoming analyzed data
    while True:
        msg = consumer_analyzed_data.poll(timeout=1000)  # 1-second timeout
        
        if msg is None:
            continue
        if msg.error():
            if msg.error().code() == KafkaError._PARTITION_EOF:
                continue
            else:
                print(f'Error: {msg.error()}')
                break
        json_data = json.loads(msg.value())
    
        # Convert JSON data to DataFrame
        df = pd.DataFrame(json_data)
        #print(f"shdhdgshgdshg{df}")
        
        generate_signals(df)
