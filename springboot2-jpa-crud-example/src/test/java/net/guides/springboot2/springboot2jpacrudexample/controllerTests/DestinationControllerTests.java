package net.guides.springboot2.springboot2jpacrudexample.controllerTests;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.guides.springboot2.springboot2jpacrudexample.controller.DestinationController;
import net.guides.springboot2.springboot2jpacrudexample.controller.WarehouseController;
import net.guides.springboot2.springboot2jpacrudexample.model.Destination;
import net.guides.springboot2.springboot2jpacrudexample.model.Warehouse;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(DestinationController.class)
public class DestinationControllerTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private DestinationController destinationController;

    @Test
    public void getAllDestinations() throws Exception {
        Destination destination = new Destination(1, 2, 3);
        List<Destination> destinations = Arrays.asList(destination);
        given(destinationController.getAllDestinations()).willReturn(destinations);

        mvc.perform(get("/destinations")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id_route").value(destination.getId_route()));
    }

    @Test
    public void createDestination() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Destination destination = new Destination(1, 2, 3);
        String jsonString = mapper.writeValueAsString(destination);

        mvc.perform(post("/destinations")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonString))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteDestination() throws Exception {
        mvc.perform(delete("/destinations/0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void updateDestination() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Destination destination = new Destination(1, 2, 3);
        String jsonString = mapper.writeValueAsString(destination);

        mvc.perform(put("/destinations/0")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonString))
                .andExpect(status().isOk());
    }

    @Test
    public void getDestinationById() throws Exception {
        mvc.perform(get("/destinations/0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void getDestinationsByRouteName() throws Exception {
        mvc.perform(get("/destinations/route/0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}