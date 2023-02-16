package com.routezeroenterprise.server;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main class of server used to run the Spring Boot app.
 */
@SpringBootApplication
public class ServerApplication {

	/**
	 * Main method used to run server.
	 * @param args Default system arguments array.
	 */
	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

}
