# Use the Ollama image as the base
FROM ollama/ollama

# Install Python, Flask, and pynvml
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    pip3 install flask pynvml && \
    rm -rf /var/lib/apt/lists/*

# Set the default Python version
RUN ln -s /usr/bin/python3 /usr/bin/python

# Copy the application files
COPY app.py /root/app.py
COPY start.sh /root/start.sh

# Make the start script executable
RUN chmod +x /root/start.sh

# Set the working directory
WORKDIR /root

# Override entrypoint to run start.sh
ENTRYPOINT ["./start.sh"]
