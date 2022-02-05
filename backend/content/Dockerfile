FROM golang

COPY . .

RUN go get  -t -v .
RUN go get  github.com/canthefason/go-watcher
RUN go install github.com/canthefason/go-watcher/cmd/watcher

ENTRYPOINT  watcher -run cmd  -watch .
