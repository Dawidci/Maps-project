package org.zaleski.engineer.engineeringApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Transport;
import org.zaleski.engineer.engineeringApp.repository.TransportRepository;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/transports")
public class TransportController {

    @Autowired
    private TransportRepository transportRepository;

    @GetMapping("")
    public List<Transport> getAllTransports() {
        return transportRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transport> getTransportById(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {
        Transport transport = transportRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found for this id :: " + id));

        return ResponseEntity.ok().body(transport);
    }

    @GetMapping("/route/{idRoute}")
    public ResponseEntity<Transport> getTransportByIdRoute(@PathVariable(value = "idRoute") long idRoute) {
        Transport transport = transportRepository.findByIdRoute(idRoute);
        return ResponseEntity.ok().body(transport);
    }

    @GetMapping("/resource-type/{idResourceType}")
    public List<Transport> getTransportsByIdResourceType(@PathVariable(value = "idResourceType") long idResourceType) {
        List<Transport> transports = transportRepository.findByIdResourceType(idResourceType);
        return transports;
    }

    @PostMapping("")
    public Transport createTransport(@Valid @RequestBody Transport transport) {
        return transportRepository.save(transport);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transport> updateTransport(@PathVariable(value = "id") Long id,
                                                   @Valid @RequestBody Transport transportDetails)
            throws ResourceNotFoundException {
        Transport transport = transportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transport not found for this id :: " + id));

        transport.setIdResourceType(transportDetails.getIdResourceType());
        transport.setIdRoute(transportDetails.getIdRoute());
        transport.setQuantity(transportDetails.getQuantity());

        final Transport updatedTransport = transportRepository.save(transport);

        return ResponseEntity.ok(updatedTransport);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteTransport(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {

        Transport transport = transportRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transport not found for this id :: " + id));

        transportRepository.delete(transport);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }
}
