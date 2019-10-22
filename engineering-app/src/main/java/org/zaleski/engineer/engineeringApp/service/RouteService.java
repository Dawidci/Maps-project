package org.zaleski.engineer.engineeringApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.zaleski.engineer.engineeringApp.controller.DestinationController;
import org.zaleski.engineer.engineeringApp.controller.TransportController;
import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Destination;
import org.zaleski.engineer.engineeringApp.model.Transport;

import java.util.List;

@Service
public class RouteService {

    @Autowired
    private DestinationController destinationController;

    @Autowired
    private TransportController transportController;

    public void deleteDestinationsByRoute(Long idRoute) {
        List<Destination> destinationsToDelete = destinationController.getDestinationsByIdRoute(idRoute);

        destinationsToDelete.forEach(destination -> {
            try {
                destinationController.deleteDestination(destination.getId());
            } catch (ResourceNotFoundException e) {
                e.printStackTrace();
            }
        });
    }

    public void deleteTransportByRoute(Long idRoute) {
        ResponseEntity<Transport> transportToDelete = transportController.getTransportByIdRoute(idRoute);

        try {
            transportController.deleteTransport(transportToDelete.getBody().getId());
        } catch (ResourceNotFoundException e) {
            e.printStackTrace();
        }
    }

}
