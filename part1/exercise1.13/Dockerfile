FROM golang:1.16-stretch

EXPOSE 8080

WORKDIR /usr/src/app

COPY ./example-backend/go.* ./
RUN go mod download && go mod verify

COPY ./example-backend/ . 
RUN go build -v
RUN go test ./...

ENV PORT=8080
ENV REQUEST_ORIGIN=https://example.com

CMD ["./server"]
