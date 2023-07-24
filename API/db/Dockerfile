FROM python:3.10-alpine
COPY requirements.txt /requirements.txt
RUN python -m venv /opt/venv
RUN pip install --upgrade pip
ENV PATH="/opt/venv/bin:$PATH"
RUN pip install -r /requirements.txt
COPY main.py /app/main.py
COPY DbHandler.py /app/DbHandler.py
COPY run.sh /app/run.sh
COPY .env /app/.env
WORKDIR /app
RUN chmod +x /app/run.sh
CMD /app/run.sh