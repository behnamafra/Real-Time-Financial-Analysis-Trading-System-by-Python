import asyncio
import threading
from websocket_server import start_websocket_server
from kafka_consumer import start_trading_signal_consumer

if __name__ == "__main__":
    # Start the WebSocket server in a separate thread
    websocket_thread = threading.Thread(target=start_websocket_server)
    websocket_thread.start()

    # Start the Kafka consumer
    asyncio.get_event_loop().run_until_complete(start_trading_signal_consumer())
