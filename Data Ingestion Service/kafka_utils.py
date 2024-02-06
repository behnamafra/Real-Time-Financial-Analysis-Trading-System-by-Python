from confluent_kafka import Producer

bootstrap_servers = 'localhost:9092'
topic = 'financial_data_topic'

producer_config = {
    'bootstrap.servers': bootstrap_servers,
    'client.id': 'producer_client'
}

producer = Producer(producer_config)

def delivery_report(err, msg):
    if err is not None:
        print(f'Message delivery failed: {err}')
    else:
        print(f'Message delivered to {msg.topic()} [{msg.partition()}] at offset {msg.offset()}')
