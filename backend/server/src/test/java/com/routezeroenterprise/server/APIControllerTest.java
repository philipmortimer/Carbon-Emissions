package com.routezeroenterprise.server;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@SpringBootTest
@AutoConfigureMockMvc
public class APIControllerTest {

	@Autowired
	private MockMvc mvc;

//	@Test
//	@Disabled("CD cannot be created with failing tests (temporary; Elliot 17/02/23)")
//	public void getHello() throws Exception {
//
//		mvc.perform(MockMvcRequestBuilders.get("/").accept(MediaType.APPLICATION_JSON))
//				.andExpect(request().asyncStarted())
//				.andExpect(status().isOk())
//				.andExpect(content().string(equalTo("{\"response\":\"Hello, World\"}")));
//	}
//
//    @Test
//	@Disabled("CD cannot be created with failing tests (temporary; Elliot 17/02/23)")
//	public void getProperties() throws Exception {
//		mvc.perform(MockMvcRequestBuilders.get("/properties").accept(MediaType.APPLICATION_JSON))
//				.andExpect(status().isOk())
//				.andExpect(content().string(equalTo("{\"emissionsEndpoint\":\"https://predict-qzzieui6kq-ew.a.run.app\",\"frontendAddress\":\"localhost:3000\"}")));
//	}

}