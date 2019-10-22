package org.zaleski.engineer.engineeringApp.controller;

import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Warehouse;
import org.zaleski.engineer.engineeringApp.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zaleski.engineer.engineeringApp.service.WarehouseService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/warehouses")
public class WarehouseController {

    @Autowired
    private WarehouseRepository warehouseRepository;

    @Autowired
    private WarehouseService warehouseService;

    @GetMapping("")
    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Warehouse> getWarehouseById(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found for this id :: " + id));

        return ResponseEntity.ok().body(warehouse);
    }

    @PostMapping("")
    public Warehouse createWarehouse(@Valid @RequestBody Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Warehouse> updateWarehouse(@PathVariable(value = "id") Long id,
                                                     @Valid @RequestBody Warehouse warehouseDetails)
            throws ResourceNotFoundException {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found for this id :: " + id));

        warehouse.setName(warehouseDetails.getName());
        warehouse.setLatitude(warehouseDetails.getLatitude());
        warehouse.setLongitude(warehouseDetails.getLongitude());
        warehouse.setAirport(warehouseDetails.isAirport());
        warehouse.setSeaport(warehouseDetails.isSeaport());

        final Warehouse updatedWarehouse = warehouseRepository.save(warehouse);
        return ResponseEntity.ok(updatedWarehouse);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteWarehouse(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {

        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found for this id :: " + id));

        warehouseRepository.delete(warehouse);
        warehouseService.deleteDestinationsByWarehouse(id);
        warehouseService.deleteResourcesByWarehouse(id);
        warehouseService.deleteRoutesByWarehouse(id);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }
}