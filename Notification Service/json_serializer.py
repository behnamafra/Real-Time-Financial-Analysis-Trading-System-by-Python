import json

def custom_json_serializer(obj):
    if isinstance(obj, float):
        # Preserve the original float value as a string
        return f"{obj}"
    return obj
