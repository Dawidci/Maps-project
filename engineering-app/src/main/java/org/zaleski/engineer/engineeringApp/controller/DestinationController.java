package org.zaleski.engineer.engineeringApp.controller;

import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Destination;
import org.zaleski.engineer.engineeringApp.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/destinations")
public class DestinationController {

    @Autowired
    private DestinationRepository destinationRepository;

    @GetMapping("")
    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Destination> getDestinationById(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found for this id :: " + id));

        return ResponseEntity.ok().body(destination);
    }

    @GetMapping("/route/{idRoute}")
    public List<Destination> getDestinationsByRouteName(@PathVariable(value = "idRoute") int idRoute) {
        List<Destination> destinations = destinationRepository.findByIdRoute(idRoute);
        return destinations;
    }

    @PostMapping("")
    public Destination createDestination(@Valid @RequestBody Destination destination) {
        return destinationRepository.save(destination);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Destination> updateDestination(@PathVariable(value = "id") Long id,
                                                     @Valid @RequestBody Destination destinationDetails)
            throws ResourceNotFoundException {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found for this id :: " + id));

        destination.setId_route(destinationDetails.getId_route());
        destination.setId_warehouse(destinationDetails.getId_warehouse());
        destination.setOrder(destinationDetails.getOrder());

        final Destination updatedDestination = destinationRepository.save(destination);
        return ResponseEntity.ok(updatedDestination);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteDestination(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {

        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found for this id :: " + id));

        destinationRepository.delete(destination);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }
}