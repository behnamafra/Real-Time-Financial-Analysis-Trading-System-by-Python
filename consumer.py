from confluent_kafka import Consumer, KafkaError
import json
import pandas as pd

# Kafka setup
bootstrap_servers = 'localhost:9092'
topic = 'financial_data_topic'

# Consumer configuration
consumer_config = {
    'bootstrap.servers': bootstrap_servers,
    'group.id': 'consumer_group',
    'auto.offset.reset': 'earliest'
}
# Create an empty DataFrame to store the closing prices
closing_prices_df = pd.DataFrame(columns=['timestamp', 'stock_symbol', 'closing_price'])

# Create an empty DataFrame to store the Moving Averages
moving_averages_df = pd.DataFrame(columns=['timestamp', 'stock_symbol', 'moving_average'])

# Define the window size for the Moving Average
window_size = 3  # You can adjust this based on your preference

def process_data(message):
    global moving_averages_df  # Declare moving_averages_df as global
    # Implement your processing logic here
    data = json.loads(message.value())
    print(f"Received data: {data}")

    if 'closing_price' in data:
        # Update closing_prices_df with new closing prices
        closing_prices_df.loc[len(closing_prices_df)] = [data['timestamp'], data['stock_symbol'], data['closing_price']]

        # Calculate Moving Average
        closing_prices_df['timestamp'] = pd.to_datetime(closing_prices_df['timestamp'])
        for symbol in closing_prices_df['stock_symbol'].unique():
            subset = closing_prices_df[closing_prices_df['stock_symbol'] == symbol].tail(window_size)
            moving_average = subset['closing_price'].mean()

            # Check if Moving Average already exists for the stock and timestamp
            if not moving_averages_df[
                (moving_averages_df['stock_symbol'] == symbol) & 
                (moving_averages_df['timestamp'] == data['timestamp'])
            ].empty:
                continue  # Skip appending if duplicate Moving Average exists

            # Append Moving Average to the DataFrame
            moving_averages_df = moving_averages_df._append(
                {'timestamp': data['timestamp'], 'stock_symbol': symbol, 'moving_average': moving_average},
                ignore_index=True
            )
        # Display the result
        print(f"Moving Averages:\n{moving_averages_df}")


if __name__ == "__main__":
    # Kafka consumer
    consumer = Consumer(consumer_config)
    consumer.subscribe([topic])

    # Process incoming data
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
        process_data(msg)
