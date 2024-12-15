# Use the official Python image
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Copy the FastAPI app code
COPY app/ .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port for FastAPI
EXPOSE 8000

# Command to run FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
