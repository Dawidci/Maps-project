package org.zaleski.engineer.engineeringApp.controllerTests;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.zaleski.engineer.engineeringApp.controller.RouteController;
import org.zaleski.engineer.engineeringApp.model.Route;
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
@WebMvcTest(RouteController.class)
public class RouteControllerTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private RouteController routeController;

    @Test
    public void getAllRoutes() throws Exception {
        Route route = new Route("Route", 1);
        List<Route> routes = Arrays.asList(route);
        given(routeController.getAllRoutes()).willReturn(routes);

        mvc.perform(get("/routes")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name").value(route.getName()));
    }

    @Test
    public void createRoute() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Route route = new Route("Route", 1);
        String jsonString = mapper.writeValueAsString(route);

        mvc.perform(post("/routes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonString))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteRoute() throws Exception {
        mvc.perform(delete("/routes/0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void updateRoute() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Route route = new Route("Route", 1);
        String jsonString = mapper.writeValueAsString(route);

        mvc.perform(put("/routes/0")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonString))
                .andExpect(status().isOk());
    }

    @Test
    public void getRouteById() throws Exception {
        mvc.perform(get("/routes/0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void getRouteByName() throws Exception {
        mvc.perform(get("/routes/name/nazwa_trasy")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
