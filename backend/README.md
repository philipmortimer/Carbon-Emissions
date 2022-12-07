# Getting the server running

### Terminal
On your terminal:
1. Navigate to the **./server** folder
2. Run `./mvnw spring-boot:run`

### IntelliJ (Alternative)
Using IntelliJ's builtin terminal:
1. Navigate to the **./server** folder
2. Type `mvn spring-boot:run` (Text should be highlighted in yellow now)
3. Run the command by pressing `⌘`+`⏎` on macOS or `Ctrl`+`Enter` on Windows and Linux

---

Note that the server will run on port 8080 by default.
To change that, change the value of `server.port` in the *application.properties* file in **./server/src/main/resources** 
