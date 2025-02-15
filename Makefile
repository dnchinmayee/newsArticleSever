# Makefile to build the Go server and React UI

.PHONY: all server ui clean


all: ui server

SERVER_EXECUTABLE := article-server
SERVER_EXECUTABLE_WINDOWS := article-server.exe
SERVER_OUTPUT_DIR := build

server: $(SERVER_OUTPUT_DIR)/$(SERVER_EXECUTABLE) $(SERVER_OUTPUT_DIR)/$(SERVER_EXECUTABLE_WINDOWS)

$(SERVER_OUTPUT_DIR)/$(SERVER_EXECUTABLE):
	mkdir -p $(SERVER_OUTPUT_DIR)
	cd server && GOOS=linux GOARCH=amd64 go build -o $(SERVER_OUTPUT_DIR)/$(SERVER_EXECUTABLE)

$(SERVER_OUTPUT_DIR)/$(SERVER_EXECUTABLE_WINDOWS):
	mkdir -p $(SERVER_OUTPUT_DIR)
	cd server && GOOS=windows GOARCH=amd64 go build -o $(SERVER_OUTPUT_DIR)/$(SERVER_EXECUTABLE_WINDOWS)


ui:
	rm -rf server/dist articleUi/dist
	cd articleUi && npm run build
	cp -r articleUi/dist server

clean:
	cd server && go clean && rm -rf $(SERVER_OUTPUT_DIR)
	cd articleUi && npm run clean
