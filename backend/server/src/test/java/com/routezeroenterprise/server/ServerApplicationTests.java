package com.routezeroenterprise.server;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.assertj.core.api.Assertions.assertThat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;

/**
 * Class used for server app tests.
 */
@SpringBootTest
class ServerApplicationTests {
	// TODO Implement more tests

	/**
	 * Tests that context loads. Not yet implemented.
	 */

	@Autowired
	private APIController controller;

	// @Autowired
    // private HomeController controller;

	// @Test
	// void contextLoads() {
	// }

	@Test
  	void contextLoads(ApplicationContext context) {
    	assertThat(context).isNotNull();
  	}

	@Test
	void contextLoads() throws Exception {
		assertThat(controller).isNotNull();
	}

}

// @SpringBootTest
// public class HttpRequestTest {

// 	@Value(value="${local.server.port}")
// 	private int port;

// 	@Autowired
// 	private TestRestTemplate restTemplate;

// 	@Test
// 	public void greetingShouldReturnDefaultMessage() throws Exception {
// 		assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/",
// 				String.class)).contains("Hello, World");
// 	}
// }
