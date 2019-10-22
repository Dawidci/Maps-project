package org.zaleski.engineer.engineeringApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.zaleski.engineer.engineeringApp.controller.DestinationController;
import org.zaleski.engineer.engineeringApp.controller.ResourceController;
import org.zaleski.engineer.engineeringApp.controller.RouteController;
import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Destination;
import org.zaleski.engineer.engineeringApp.model.Resource;
import org.zaleski.engineer.engineeringApp.model.Route;

import java.util.List;

@Service
public class WarehouseService {

    @Autowired
    private ResourceController resourceController;

    @Autowired
    private DestinationController destinationController;

    @Autowired
    private RouteController routeController;

    public void deleteResourcesByWarehouse(Long idWarehouse) {
        List<Resource> resourcesToDelete = resourceController.getResourcesByIdWarehouse(idWarehouse);

        resourcesToDelete.forEach(resource -> {
            try {
                resourceController.deleteResource(resource.getId());
            } catch (ResourceNotFoundException e) {
                e.printStackTrace();
            }
        });
    }

    public void deleteDestinationsByWarehouse(Long idWarehouse) {
        List<Destination> destinationsToDelete = destinationController.getDestinationsByIdWarehouse(idWarehouse);

        destinationsToDelete.forEach(destination -> {
            try {
                destinationController.deleteDestination(destination.getId());
            } catch (ResourceNotFoundException e) {
                e.printStackTrace();
            }
        });
    }

    public void deleteRoutesByWarehouse(Long idWarehouse) {
        List<Route> routesToDelete = routeController.getRoutesByIdFirstWarehouse(idWarehouse);

        routesToDelete.forEach(route -> {
            try {
                routeController.deleteRoute(route.getId());
            } catch (ResourceNotFoundException e) {
                e.printStackTrace();
            }
        });
    }

}
