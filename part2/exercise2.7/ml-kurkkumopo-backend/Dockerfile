FROM python:3.6.7-slim

WORKDIR /src
RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y
COPY ./requirements.txt ./requirements.txt

RUN pip install --upgrade pip

RUN pip install -r requirements.txt
COPY . .
CMD ["python", "-u", "app.py"]
