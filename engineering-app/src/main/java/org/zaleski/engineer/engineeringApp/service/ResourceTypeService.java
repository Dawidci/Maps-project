package org.zaleski.engineer.engineeringApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.zaleski.engineer.engineeringApp.controller.ResourceController;
import org.zaleski.engineer.engineeringApp.controller.TransportController;
import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Resource;
import org.zaleski.engineer.engineeringApp.model.Transport;

import java.util.List;

@Service
public class ResourceTypeService {

    @Autowired
    private ResourceController resourceController;

    @Autowired
    private TransportController transportController;

    public void deleteResourceByResourceType(Long idResourceType) {
        List<Resource> resourcesToDelete = resourceController.getResourcesByIdResourceType(idResourceType);

        resourcesToDelete.forEach(resource -> {
            try {
                resourceController.deleteResource(resource.getId());
            } catch (ResourceNotFoundException e) {
                e.printStackTrace();
            }
        });
    }

    public void deleteTransportByResourceType(Long idResourceType) {
        List<Transport> transportsToDelete = transportController.getTransportsByIdResourceType(idResourceType);

        transportsToDelete.forEach(transport -> {
            try {
                transportController.deleteTransport(transport.getId());
            } catch (ResourceNotFoundException e) {
                e.printStackTrace();
            }
        });
    }

}
