package org.zaleski.engineer.engineeringApp.controllerTests;

import org.zaleski.engineer.engineeringApp.controller.WarehouseController;
import org.zaleski.engineer.engineeringApp.model.Warehouse;
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

import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@WebMvcTest(WarehouseController.class)
public class WarehouseControllerTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private WarehouseController warehouseController;

    @Test
    public void getAllWarehouses() throws Exception {
        Warehouse warehouse = new Warehouse("Warehouse", 14, 15, true, false);
        List<Warehouse> warehouses = Arrays.asList(warehouse);
        given(warehouseController.getAllWarehouses()).willReturn(warehouses);

        mvc.perform(get("/warehouses")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name").value(warehouse.getName()));

    }

    @Test
    public void createWarehouse() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Warehouse warehouse = new Warehouse("Warehouse", 14, 15, true, false);
        String jsonString = mapper.writeValueAsString(warehouse);

        mvc.perform(post("/warehouses")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonString))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteWarehouse() throws Exception {
        mvc.perform(delete("/warehouses/0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void updateWarehouse() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Warehouse warehouse = new Warehouse("Warehouse", 14, 15, true, false);
        String jsonString = mapper.writeValueAsString(warehouse);

        mvc.perform(put("/warehouses/0")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonString))
                .andExpect(status().isOk());
    }

    @Test
    public void getWarehouseById() throws Exception {
        mvc.perform(get("/warehouses/0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}