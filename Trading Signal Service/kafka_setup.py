from confluent_kafka import Consumer, Producer

# Kafka setup for receive data from producer
bootstrap_servers = 'localhost:9092'
topic_to_receive = 'analyzed-data'

# Consumer configuration
consumer_config = {
    'bootstrap.servers': bootstrap_servers,
    'group.id': 'consumer_group',
    'auto.offset.reset': 'earliest'
}

# Kafka setup for sending data to the topic
topic_to_send = 'trading-signal'

# Producer configuration
producer_config = {
    'bootstrap.servers': bootstrap_servers,
}

# Create Kafka producer and consumer instances
producer = Producer(producer_config)
consumer = Consumer(consumer_config)
consumer.subscribe([topic_to_receive])
