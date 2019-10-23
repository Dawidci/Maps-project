package org.zaleski.engineer.engineeringApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Destination;
import org.zaleski.engineer.engineeringApp.model.Route;
import org.zaleski.engineer.engineeringApp.model.Transport;
import org.zaleski.engineer.engineeringApp.repository.RouteRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class RouteService {

    @Autowired private DestinationService destinationService;
    @Autowired private TransportService transportService;
    @Autowired private RouteRepository routeRepository;

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public ResponseEntity<Route> getRouteById(Long id) throws ResourceNotFoundException {
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Route not found for this id :: " + id));
        return ResponseEntity.ok().body(route);
    }

    public ResponseEntity<Route> getRouteByName(String name) {
        Route route = routeRepository.findByName(name);
        return ResponseEntity.ok().body(route);
    }

    public List<Route> getRoutesByIdFirstWarehouse(long idFirstWarehouse) {
        return routeRepository.findByIdFirstWarehouse(idFirstWarehouse);
    }

    public Route createRoute(Route route) {
        return routeRepository.save(route);
    }

    public ResponseEntity<Route> updateRoute(Long id, Route routeDetails) throws ResourceNotFoundException {
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Route not found for this id :: " + id));

        route.setName(routeDetails.getName());
        final Route updatedRoute = routeRepository.save(route);
        return ResponseEntity.ok(updatedRoute);
    }

    public Map<String, Boolean> deleteRoute(Long id) throws ResourceNotFoundException {
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Route not found for this id :: " + id));

        routeRepository.delete(route);
        this.deleteDestinationsByRoute(id);
        this.deleteTransportByRoute(id);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    private void deleteDestinationsByRoute(Long idRoute) {
        List<Destination> destinationsToDelete = destinationService.getDestinationsByIdRoute(idRoute);

        destinationsToDelete.forEach(destination -> {
            try {
                destinationService.deleteDestination(destination.getId());
            } catch (ResourceNotFoundException e) {
                e.printStackTrace();
            }
        });
    }

    private void deleteTransportByRoute(Long idRoute) {
        ResponseEntity<Transport> transportToDelete = transportService.getTransportByIdRoute(idRoute);

        if(transportToDelete != null) {
            try {
                transportService.deleteTransport(Objects.requireNonNull(transportToDelete.getBody()).getId());
            } catch (ResourceNotFoundException e) {
                e.printStackTrace();
            }
        }
    }

}
