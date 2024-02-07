import pandas as pd
from kafka_setup import producer,topic_to_send


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

    # Get the latest data
    last_row = data.iloc[-1]

    send_data_to_kafka(last_row)
    print(f"new_data : {last_row}")

def send_data_to_kafka(data):
    # Convert DataFrame to JSON string
    json_data = data.to_json(orient='records')
    
    # Produce the message to the Kafka topic
    producer.produce(topic_to_send, key=None, value=json_data)
    print("data sent --------------------------")
    producer.flush()  # Ensure that all messages are sent