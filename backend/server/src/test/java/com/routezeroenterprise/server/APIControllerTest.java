package com.routezeroenterprise.server;

import static com.routezeroenterprise.server.ServerCSVTests.loadTextFileTest;
import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import org.junit.jupiter.api.Test;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@RunWith(SpringRunner.class)
@WebMvcTest(APIController.class)
public class APIControllerTest {

	@Autowired
	private MockMvc mvc;

	@Test
	public void getPredictionAPITest() throws Exception {
		MediaType mediaType = MediaType.parseMediaType("text/csv");
		String CSV_VALID = loadTextFileTest("src/main/resources/TestCSV/VALID.csv");
		String responseObject = "$.predictions[0].currentCarbonKgCo2e";
		String expectedObjectValue = "7.952942888820001";

		this.mvc.perform(MockMvcRequestBuilders
						.post("/get_predictions")
						.contentType(mediaType)
						.content(CSV_VALID))
				.andExpect(status().isOk())
				.andExpect(jsonPath(responseObject).value(expectedObjectValue));
	}
}