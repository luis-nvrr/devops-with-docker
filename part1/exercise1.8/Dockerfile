FROM ubuntu:20.04

WORKDIR /home/ubuntu

COPY curler.sh .

RUN apt-get update
RUN apt-get install curl -y

CMD ./curler.sh
