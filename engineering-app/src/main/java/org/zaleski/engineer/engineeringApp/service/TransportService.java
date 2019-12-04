package org.zaleski.engineer.engineeringApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Transport;
import org.zaleski.engineer.engineeringApp.repository.TransportRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TransportService {

    @Autowired private TransportRepository transportRepository;

    public List<Transport> getAllTransports() {
        return transportRepository.findAll();
    }

    public ResponseEntity<Transport> getTransportById(Long id) throws ResourceNotFoundException {
        Transport transport = transportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found for this id :: " + id));
        return ResponseEntity.ok().body(transport);
    }

    public ResponseEntity<Transport> getTransportByIdRoute(long idRoute) {
        Transport transport = transportRepository.findByIdRoute(idRoute);
        return ResponseEntity.ok().body(transport);
    }

    public List<Transport> getTransportsByIdResourceType(long idResourceType) {
        return transportRepository.findByIdResourceType(idResourceType);
    }

    public Transport createTransport(Transport transport) {
        return transportRepository.save(transport);
    }

    public ResponseEntity<Transport> updateTransport(Long id, Transport transportDetails) throws ResourceNotFoundException {
        Transport transport = transportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transport not found for this id :: " + id));

        transport.setIdResourceType(transportDetails.getIdResourceType());
        transport.setIdRoute(transportDetails.getIdRoute());
        transport.setQuantity(transportDetails.getQuantity());
        transport.setNoTrucks(transportDetails.getNoTrucks());

        final Transport updatedTransport = transportRepository.save(transport);
        return ResponseEntity.ok(updatedTransport);
    }

    public Map<String, Boolean> deleteTransport(Long id) throws ResourceNotFoundException {
        Transport transport = transportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transport not found for this id :: " + id));

        transportRepository.delete(transport);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }
}
