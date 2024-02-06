from flask import Flask, request
import json
import threading
from kafka_utils import producer, topic, delivery_report
from data_validation import *

app = Flask(__name__)

@app.route('/ingest', methods=['POST'])
def ingest_data():
    try:
        data = json.loads(request.data)

        # Validate timestamp
        validate_timestamp(data.get('timestamp'))

        # Validate data type
        validate_data_type(data)

        # Validate stock symbol
        validate_stock_symbol(data.get('stock_symbol'))

        # Validate numeric values
        validate_numeric_values(data)

        # Validate consistency checks
        validate_consistency(data)

        # Validate business rules
        validate_business_rules(data)

        # Validate additional data
        validate_additional_data(data)

        # Print the received data
        print(f'Received data: {data}')
        print("---------------------------------")

        # Assuming the data is in the expected format, you may need to adjust this
        producer.produce(topic, key=None, value=json.dumps(data), callback=delivery_report)
        print(f'data sent: {data}')
        producer.poll(0)  # Trigger delivery reports
        threading.Thread(target=producer.flush).start()
        return {'status': 'success'}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}

if __name__ == "__main__":
    app.run(port=8090)  # Run the Flask app on port 8090
