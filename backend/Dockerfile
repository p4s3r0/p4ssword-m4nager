# Use the official Python image
FROM python:3.11-slim

# Install oathtool and dependencies
RUN apt-get update && \
    apt-get install -y oathtool && \
    rm -rf /var/lib/apt/lists/*  # Clean up to reduce image size

# Set the working directory
WORKDIR /app

# Copy the FastAPI app code
COPY app/ .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port for FastAPI
EXPOSE 8000

# Command to run FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
