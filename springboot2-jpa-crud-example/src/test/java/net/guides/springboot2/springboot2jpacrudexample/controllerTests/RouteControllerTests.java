package net.guides.springboot2.springboot2jpacrudexample.controllerTests;

import net.guides.springboot2.springboot2jpacrudexample.controller.RouteController;
import net.guides.springboot2.springboot2jpacrudexample.controller.WarehouseController;
import net.guides.springboot2.springboot2jpacrudexample.model.Route;
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
}
