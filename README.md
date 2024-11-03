# Wilco's Prompting Power Usage Experiment ☺

Welcome to the repository for Wilco's Prompting Power Usage Experiment! This project is a fun exploration into monitoring the power usage of an AI model inference using Docker and Node.js. The system captures GPU power consumption and displays it in real-time on a web interface.

![Wilco's Prompting Power Usage Experiment](https://github.com/WBurggraaf/Ollama-Experiment/blob/3f7c5f85608e6af283772ef47fc115462a99ab70/Screenshot.png)

## Important Note

This is primarily an experimental project, and while it aims to showcase the concepts of power monitoring during AI inference, please be aware that the calculations may not be perfect and could contain errors. This setup is intended for inspiration and experimentation—take the ideas here and run with them!

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker Desktop**: Make sure Docker is running on your machine. You can download it from [Docker's official site](https://www.docker.com/products/docker-desktop).
- **Node.js**: Required for running the frontend web server. Download it from [Node.js official site](https://nodejs.org/).

## Getting Started

### Step 1: Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/WBurggraaf/Ollama-Experiment.git
cd Ollama-Experiment

hints:
docker-compose up --build
npm install
npm start
http://localhost:3000
