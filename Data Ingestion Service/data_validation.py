import json

def validate_timestamp(timestamp):
    # Check if the timestamp is a valid and reasonable value
    # You may customize this validation based on your specific needs
    return isinstance(timestamp, (int, float))

def validate_data_type(data):
    # Validate data type
    required_fields = {
        'stock_symbol':["stock_symbol", "opening_price", "closing_price", "high", "low","volume","timestamp"],
        'order_book': ['timestamp', 'stock_symbol', 'order_type', 'price', 'quantity'],
        'market_data': ['timestamp', 'stock_symbol', 'market_cap', 'pe_ratio'],
        'economic_indicator': ['timestamp', 'indicator_name', 'value'],
        'news_sentiment': ['timestamp', 'stock_symbol', 'sentiment_score', 'sentiment_magnitude']
    }

    data_type = data.get('data_type')
    if data_type not in required_fields:
        raise ValueError(f"Invalid data type: {data_type}")

    for field in required_fields[data_type]:
        if field not in data:
            raise ValueError(f"Missing required field '{field}' for data type '{data_type}'")

def validate_stock_symbol(stock_symbol):
    # Validate stock symbol
    # You may want to check against a list of valid stock symbols
    # or use an external service to validate the symbol
    if not stock_symbol or not isinstance(stock_symbol, str):
        raise ValueError("Invalid stock symbol")

def validate_numeric_values(data):
    # Validate numeric values
    numeric_fields = ['price', 'quantity', 'market_cap', 'pe_ratio', 'opening_price', 'closing_price', 'high', 'low', 'volume']
    
    for field in numeric_fields:
        if field in data and (not isinstance(data[field], (int, float)) or data[field] < 0):
            raise ValueError(f"Invalid value for field '{field}'")

def validate_consistency(data):
    # Validate consistency checks
    if 'opening_price' in data and 'high' in data and 'low' in data:
        if not (data['low'] <= data['opening_price'] <= data['high']):
            raise ValueError("Inconsistent values: opening_price should be within the range [low, high]")

def validate_business_rules(data):
    # Apply business rules validation
    # You may add rules specific to your application
    pass

def validate_additional_data(data):
    # Validate additional data, e.g., news sentiment scores and magnitudes
    if 'sentiment_score' in data and (data['sentiment_score'] < 0 or data['sentiment_score'] > 1):
        raise ValueError("Invalid sentiment_score value")

    if 'sentiment_magnitude' in data and (data['sentiment_magnitude'] < 0 or data['sentiment_magnitude'] > 1):
        raise ValueError("Invalid sentiment_magnitude value")
