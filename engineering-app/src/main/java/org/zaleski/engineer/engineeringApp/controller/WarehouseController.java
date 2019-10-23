package org.zaleski.engineer.engineeringApp.controller;

import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Warehouse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zaleski.engineer.engineeringApp.service.WarehouseService;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/warehouses")
public class WarehouseController {

    @Autowired private WarehouseService warehouseService;

    @GetMapping("")
    public List<Warehouse> getAllWarehouses() {
        return warehouseService.getAllWarehouses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Warehouse> getWarehouseById(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        return warehouseService.getWarehouseById(id);
    }

    @PostMapping("")
    public Warehouse createWarehouse(@Valid @RequestBody Warehouse warehouse) {
        return warehouseService.createWarehouse(warehouse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Warehouse> updateWarehouse(@PathVariable(value = "id") Long id,
                                                     @Valid @RequestBody Warehouse warehouseDetails)
            throws ResourceNotFoundException {
        return warehouseService.updateWarehouse(id, warehouseDetails);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteWarehouse(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        return warehouseService.deleteWarehouse(id);
    }
}