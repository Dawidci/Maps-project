package net.guides.springboot2.springboot2jpacrudexample.controllerTests;

import net.guides.springboot2.springboot2jpacrudexample.controller.WarehouseController;
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
}