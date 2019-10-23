package org.zaleski.engineer.engineeringApp.controller;

import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Destination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zaleski.engineer.engineeringApp.service.DestinationService;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/destinations")
public class DestinationController {

    @Autowired private DestinationService destinationService;

    @GetMapping("")
    public List<Destination> getAllDestinations() {
        return destinationService.getAllDestinations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Destination> getDestinationById(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        return destinationService.getDestinationById(id);
    }

    @GetMapping("/route/{idRoute}")
    public List<Destination> getDestinationsByIdRoute(@PathVariable(value = "idRoute") Long idRoute) {
        return destinationService.getDestinationsByIdRoute(idRoute);
    }

    @GetMapping("/warehouse/{idWarehouse}")
    public List<Destination> getDestinationsByIdWarehouse(@PathVariable(value = "idWarehouse") Long idWarehouse) {
        return destinationService.getDestinationsByIdWarehouse(idWarehouse);
    }

    @PostMapping("")
    public Destination createDestination(@Valid @RequestBody Destination destination) {
        return destinationService.createDestination(destination);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Destination> updateDestination(@PathVariable(value = "id") Long id,
                                                         @Valid @RequestBody Destination destinationDetails)
            throws ResourceNotFoundException {
        return destinationService.updateDestination(id, destinationDetails);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteDestination(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        return destinationService.deleteDestination(id);
    }
}