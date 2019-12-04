package org.zaleski.engineer.engineeringApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Destination;
import org.zaleski.engineer.engineeringApp.model.Resource;
import org.zaleski.engineer.engineeringApp.model.Route;
import org.zaleski.engineer.engineeringApp.model.Warehouse;
import org.zaleski.engineer.engineeringApp.repository.WarehouseRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class WarehouseService {

    @Autowired private WarehouseRepository warehouseRepository;
    @Autowired private ResourceService resourceService;
    @Autowired private DestinationService destinationService;
    @Autowired private RouteService routeService;

    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    public ResponseEntity<Warehouse> getWarehouseById(Long id) throws ResourceNotFoundException {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found for this id :: " + id));
        return ResponseEntity.ok().body(warehouse);
    }

    public Warehouse createWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    public ResponseEntity<Warehouse> updateWarehouse(Long id, Warehouse warehouseDetails) throws ResourceNotFoundException {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found for this id :: " + id));

        warehouse.setName(warehouseDetails.getName());
        warehouse.setLatitude(warehouseDetails.getLatitude());
        warehouse.setLongitude(warehouseDetails.getLongitude());

        final Warehouse updatedWarehouse = warehouseRepository.save(warehouse);
        return ResponseEntity.ok(updatedWarehouse);
    }

    public Map<String, Boolean> deleteWarehouse(Long id) throws ResourceNotFoundException {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found for this id :: " + id));

        warehouseRepository.delete(warehouse);
        this.deleteDestinationsByWarehouse(id);
        this.deleteResourcesByWarehouse(id);
        this.deleteRoutesByWarehouse(id);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    private void deleteResourcesByWarehouse(Long idWarehouse) {
        List<Resource> resourcesToDelete = resourceService.getResourcesByIdWarehouse(idWarehouse);

        resourcesToDelete.forEach(resource -> {
            try {
                resourceService.deleteResource(resource.getId());
            } catch (ResourceNotFoundException e) {
                e.printStackTrace();
            }
        });
    }

    private void deleteDestinationsByWarehouse(Long idWarehouse) {
        List<Destination> destinationsToDelete = destinationService.getDestinationsByIdWarehouse(idWarehouse);

        destinationsToDelete.forEach(destination -> {
            try {
                destinationService.deleteDestination(destination.getId());
            } catch (ResourceNotFoundException e) {
                e.printStackTrace();
            }
        });
    }

    private void deleteRoutesByWarehouse(Long idWarehouse) {
        List<Route> routesToDelete = routeService.getRoutesByIdFirstWarehouse(idWarehouse);

        routesToDelete.forEach(route -> {
            try {
                routeService.deleteRoute(route.getId());
            } catch (ResourceNotFoundException e) {
                e.printStackTrace();
            }
        });
    }
}
