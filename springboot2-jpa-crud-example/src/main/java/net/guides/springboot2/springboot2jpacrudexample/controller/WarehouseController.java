package net.guides.springboot2.springboot2jpacrudexample.controller;

import net.guides.springboot2.springboot2jpacrudexample.exception.ResourceNotFoundException;
import net.guides.springboot2.springboot2jpacrudexample.model.Warehouse;
import net.guides.springboot2.springboot2jpacrudexample.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("")
    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    @GetMapping("test")
    public String test() {
        return "TEST";
    }

    @GetMapping("/{id}")
    public ResponseEntity<Warehouse> getWarehouseById(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {
        Warehouse warehouse = warehouseRepository
                .findById(id)
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
    public Map<String, Boolean> deleteWarehouse(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {

        Warehouse warehouse = warehouseRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found for this id :: " + id));

        warehouseRepository.delete(warehouse);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }
}