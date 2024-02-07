import asyncio
import threading
import websockets
import json
from json_serializer import custom_json_serializer

connected_clients = set()

async def send_data_to_websocket(data):
    # Get all connected clients and send data to each one
    for websocket in connected_clients:
        try:
            # Use custom_json_serializer to handle serialization
            await websocket.send(json.dumps(data, default=custom_json_serializer))
        except websockets.exceptions.ConnectionClosed:
            # Handle the case where a connection is closed
            pass

async def consumer_handler(websocket, path):
    # Add the connected WebSocket client to the set
    connected_clients.add(websocket)

    try:
        while True:
            await asyncio.sleep(1)
    finally:
        # Remove the WebSocket client when the connection is closed
        connected_clients.remove(websocket)

def start_websocket_server():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    
    start_server = websockets.serve(consumer_handler, "localhost", 3000)
    loop.run_until_complete(start_server)
    loop.run_forever()
