package org.zaleski.engineer.engineeringApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Destination;
import org.zaleski.engineer.engineeringApp.repository.DestinationRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DestinationService {

    @Autowired private DestinationRepository destinationRepository;

    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    public ResponseEntity<Destination> getDestinationById(Long id) throws ResourceNotFoundException {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found for this id :: " + id));

        return ResponseEntity.ok().body(destination);
    }

    public List<Destination> getDestinationsByIdRoute(Long idRoute) {
        return destinationRepository.findByIdRoute(idRoute);
    }

    public List<Destination> getDestinationsByIdWarehouse(Long idWarehouse) {
        return destinationRepository.findByIdWarehouse(idWarehouse);
    }

    public Destination createDestination(Destination destination) {
        return destinationRepository.save(destination);
    }

    public ResponseEntity<Destination> updateDestination(Long id, Destination destinationDetails)
            throws ResourceNotFoundException {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found for this id :: " + id));

        destination.setId_route(destinationDetails.getId_route());
        destination.setId_warehouse(destinationDetails.getId_warehouse());
        destination.setOrder(destinationDetails.getOrder());
        destination.setQuantity(destinationDetails.getQuantity());

        final Destination updatedDestination = destinationRepository.save(destination);
        return ResponseEntity.ok(updatedDestination);
    }

    public Map<String, Boolean> deleteDestination(Long id) throws ResourceNotFoundException {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found for this id :: " + id));

        destinationRepository.delete(destination);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }
}
