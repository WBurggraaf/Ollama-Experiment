#!/bin/bash

# Start the Ollama server in the background
ollama serve &

# Wait for the server to be ready
sleep 0.5

# Pull the model (e.g., llama3)
ollama pull llama3

# Run the main application (adjust the command as needed for your app)
python3 /root/app.py
