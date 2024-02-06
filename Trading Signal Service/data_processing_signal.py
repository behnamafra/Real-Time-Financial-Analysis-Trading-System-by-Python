import pandas as pd

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



    print(f"new_data : {data}")

