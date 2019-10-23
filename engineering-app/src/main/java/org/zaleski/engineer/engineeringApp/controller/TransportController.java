package org.zaleski.engineer.engineeringApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Transport;
import org.zaleski.engineer.engineeringApp.service.TransportService;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/transports")
public class TransportController {

    @Autowired private TransportService transportService;

    @GetMapping("")
    public List<Transport> getAllTransports() {
        return transportService.getAllTransports();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transport> getTransportById(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        return transportService.getTransportById(id);
    }

    @GetMapping("/route/{idRoute}")
    public ResponseEntity<Transport> getTransportByIdRoute(@PathVariable(value = "idRoute") long idRoute) {
        return transportService.getTransportByIdRoute(idRoute);
    }

    @GetMapping("/resource-type/{idResourceType}")
    public List<Transport> getTransportsByIdResourceType(@PathVariable(value = "idResourceType") long idResourceType) {
        return transportService.getTransportsByIdResourceType(idResourceType);
    }

    @PostMapping("")
    public Transport createTransport(@Valid @RequestBody Transport transport) {
        return transportService.createTransport(transport);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transport> updateTransport(@PathVariable(value = "id") Long id,
                                                     @Valid @RequestBody Transport transportDetails)
            throws ResourceNotFoundException {
        return transportService.updateTransport(id, transportDetails);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteTransport(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        return transportService.deleteTransport(id);
    }
}
