# Getting the server running

### Terminal
On your terminal:
1. Navigate to the `./server` folder
2. Run `./mvnw spring-boot:run`

### IntelliJ (Alternative)
Using IntelliJ's builtin terminal:
1. Navigate to the `./server` folder
2. Type `mvn spring-boot:run` (Text should be highlighted in yellow now)
3. Run the command by pressing `⌘`+`⏎` on macOS or `Ctrl`+`Enter` on Windows and Linux

---

## Setting up the API key
For the backend to successfully send requests to the RouteZero API, you should create a new file `api_key.json` in the `./server/src/main/resources` directory and include your authorized API key. An `api_key_example.json` file in the same directory (`/resources`) is provided to show the format of your new `api_key.json` file.

---

## Changing localhost port
Note that the server will run on localhost port 8080 by default.
To change the port, change the value of `server.port` in the `application.properties` file in `./server/src/main/resources` directory.
