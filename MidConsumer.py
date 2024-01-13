from confluent_kafka import Consumer, KafkaError, Producer
import json
import pandas as pd
import pandas as pd
import numpy as np

# Initialize combined_data as an empty DataFrame
combined_data = pd.DataFrame(columns=['timestamp', 'stock_symbol', 'closing_price', 'signal'])

# Kafka setup for receive data from producer
bootstrap_servers = 'localhost:9092'
topicToRCV = 'financial_data_topic'

# Consumer configuration
consumer_config = {
    'bootstrap.servers': bootstrap_servers,
    'group.id': 'consumer_group',
    'auto.offset.reset': 'earliest'
}
#-------------------------------------------
# Kafka setup for sending data to the topic
bootstrap_servers = 'localhost:9092'
topicToSND = 'analyzed-data'

# Producer configuration
producer_config = {
    'bootstrap.servers': bootstrap_servers,
}

# Create a Kafka producer instance
producer = Producer(producer_config)


# Create an empty DataFrame to store the closing prices
closing_prices_df = pd.DataFrame(columns=['timestamp', 'stock_symbol', 'closing_price'])

# Create an empty DataFrame to store the Moving Averages
moving_averages_df = pd.DataFrame(columns=['timestamp', 'stock_symbol', 'moving_average'])

# Create an empty DataFrame to store the Exponential Moving Averages
ema_df = pd.DataFrame(columns=['timestamp', 'stock_symbol', 'ema'])

# Create an empty DataFrame to store the Relative Strength Index (RSI)
rsi_df = pd.DataFrame(columns=['timestamp', 'stock_symbol', 'rsi'])

# Define the window size for the Moving Average
window_size = 14  # You can adjust this based on your preference

# Smoothing factor for Exponential Moving Average (EMA)
alpha = 0.2


def calculate_ema(data):
    """
    Calculate Exponential Moving Average (EMA) for a given pandas DataFrame.

    Parameters:
    - data: pandas DataFrame with 'timestamp' and 'closing_price' columns

    Returns:
    - pandas DataFrame with additional 'ema' column
    """
    data['timestamp'] = pd.to_datetime(data['timestamp'])
    data = data.sort_values(by='timestamp')  # Ensure data is sorted by timestamp

    # Calculate EMA
    data['ema'] = data['closing_price'].ewm(alpha=alpha, adjust=False).mean()

    return data

def generate_signals(data):
    """
    Generate buy/sell signals based on the calculated indicators.

    Parameters:
    - data: pandas DataFrame with 'timestamp', 'stock_symbol', 'closing_price', 'moving_average', 'ema', 'rsi' columns

    Returns:
    - pandas DataFrame with additional 'signal' column
    """
    # Define buy/sell thresholds (you can adjust these based on your strategy)
    buy_threshold = 30
    sell_threshold = 70

    # Initialize the 'signal' column with 'Hold'
    data['signal'] = 'Hold'

    # Generate signals based on RSI
    data.loc[data['rsi'] < buy_threshold, 'signal'] = 'Buy'
    data.loc[data['rsi'] > sell_threshold, 'signal'] = 'Sell'

    # Generate signals based on Moving Average and Exponential Moving Average (EMA)
    data.loc[data['closing_price'] > data['moving_average'], 'signal'] = 'Buy'
    data.loc[data['closing_price'] < data['ema'], 'signal'] = 'Sell'

    return data

def calculate_rsi(data):
    """
    Calculate Relative Strength Index (RSI) for a given pandas DataFrame.

    Parameters:
    - data: pandas DataFrame with 'timestamp' and 'closing_price' columns

    Returns:
    - pandas DataFrame with additional 'rsi' column
    """
    data['timestamp'] = pd.to_datetime(data['timestamp'])
    data = data.sort_values(by='timestamp')  # Ensure data is sorted by timestamp

    # Calculate price changes
    delta = data['closing_price'].diff()

    # Calculate gains (positive changes) and losses (negative changes)
    gains = delta.where(delta > 0, 0)
    losses = -delta.where(delta < 0, 0)

    # Calculate average gains and losses over the specified window
    avg_gains = gains.rolling(window=window_size, min_periods=1).mean()
    avg_losses = losses.rolling(window=window_size, min_periods=1).mean()

    # Calculate Relative Strength (RS)
    rs = avg_gains / avg_losses

    # Calculate Relative Strength Index (RSI)
    data['rsi'] = 100 - (100 / (1 + rs))

    return data

def process_data(message):
    global closing_prices_df, moving_averages_df, ema_df, rsi_df, combined_data  # Declare moving_averages_df as global
    # Implement your processing logic here
    data = json.loads(message.value())
    print(f"Received data: {data}")

    if 'closing_price' in data:
        # Update closing_prices_df with new closing prices
        new_row = {'timestamp': pd.to_datetime(data['timestamp']), 'stock_symbol': data['stock_symbol'], 'closing_price': data['closing_price']}
        closing_prices_df = closing_prices_df._append(new_row, ignore_index=True)

        # Ensure 'timestamp' column in closing_prices_df is datetime64[ns]
        closing_prices_df['timestamp'] = pd.to_datetime(closing_prices_df['timestamp'])


        # Convert 'timestamp' column to datetime64[ns] in moving_averages_df
        moving_averages_df['timestamp'] = pd.to_datetime(moving_averages_df['timestamp'])

        # Calculate Moving Average
        closing_prices_df['timestamp'] = pd.to_datetime(closing_prices_df['timestamp'])
        for symbol in closing_prices_df['stock_symbol'].unique():
            subset = closing_prices_df[closing_prices_df['stock_symbol'] == symbol].tail(window_size)
            moving_average = subset['closing_price'].mean()

            # Check if Moving Average already exists for the stock and timestamp
            if not moving_averages_df[
                (moving_averages_df['stock_symbol'] == symbol) & 
                (moving_averages_df['timestamp'] == pd.to_datetime(data['timestamp']))  # Convert to datetime
            ].empty:
                continue  # Skip appending if duplicate Moving Average exists

            # Append Moving Average to the DataFrame
            moving_averages_df = moving_averages_df._append(
                {'timestamp': pd.to_datetime(data['timestamp']), 'stock_symbol': symbol, 'moving_average': moving_average},
                ignore_index=True
            )

        # Calculate Exponential Moving Average (EMA)
        closing_prices_df = calculate_ema(closing_prices_df)

        # Convert 'timestamp' column in ema_df
        ema_df['timestamp'] = pd.to_datetime(ema_df['timestamp'])

        # Check if enough data points are available for RSI calculation
        if len(closing_prices_df) >= window_size:
            # Calculate Relative Strength Index (RSI)
            rsi_df = calculate_rsi(closing_prices_df)

        # Merge DataFrames with the same 'timestamp' and 'stock_symbol' columns
            
            combined_data = pd.merge(
                closing_prices_df[['timestamp', 'stock_symbol', 'closing_price']],
                moving_averages_df[['timestamp', 'stock_symbol', 'moving_average']],
                on=['timestamp', 'stock_symbol'],
                how='left'
            )
            
            # Merge with EMA and RSI DataFrames
            combined_data = pd.merge(
                combined_data,
                ema_df[['timestamp', 'stock_symbol', 'ema']],
                on=['timestamp', 'stock_symbol'],
                how='left'
            )
           
            combined_data = pd.merge(
                combined_data,
                rsi_df[['timestamp', 'stock_symbol', 'rsi']],
                on=['timestamp', 'stock_symbol'],
                how='left'
            )
            

            # Generate buy/sell signals
            combined_data = generate_signals(combined_data)

            # Display the result
            print(f"Buy/Sell Signals:\n{combined_data[['timestamp', 'stock_symbol', 'closing_price', 'signal']]}")

        # Display the result
        print(f"Moving Averages:\n{moving_averages_df}")
        print(f"Exponential Moving Averages:\n{ema_df[['timestamp', 'stock_symbol', 'ema']]}")
        print(f"Relative Strength Index (RSI):\n{rsi_df[['timestamp', 'stock_symbol', 'rsi']]}")
        

        # Check if there are enough data points for RSI calculation
        if len(closing_prices_df) >= window_size:
            print(f"Relative Strength Index (RSI):\n{rsi_df[['timestamp', 'stock_symbol', 'rsi']]}")

        # Send data to Kafka Consumer
        send_data_to_kafka(combined_data[['timestamp', 'stock_symbol', 'closing_price', 'signal']])

def send_data_to_kafka(data):
    # Convert DataFrame to JSON string
    json_data = data.to_json(orient='records')

    # Produce the message to the Kafka topic
    producer.produce(topicToSND, key=None, value=json_data)
    producer.flush()  # Ensure that all messages are sent


if __name__ == "__main__":
    # Kafka consumer
    consumer = Consumer(consumer_config)
    consumer.subscribe([topicToRCV])

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

