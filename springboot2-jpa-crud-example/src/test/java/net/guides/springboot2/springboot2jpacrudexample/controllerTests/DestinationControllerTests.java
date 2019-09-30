package net.guides.springboot2.springboot2jpacrudexample.controllerTests;

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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
}