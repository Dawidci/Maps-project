package org.zaleski.engineer.engineeringApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Resource;
import org.zaleski.engineer.engineeringApp.model.ResourceType;
import org.zaleski.engineer.engineeringApp.model.Transport;
import org.zaleski.engineer.engineeringApp.repository.ResourceTypeRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ResourceTypeService {

    @Autowired private ResourceTypeRepository resourceTypeRepository;
    @Autowired private ResourceService resourceService;
    @Autowired private TransportService transportService;

    public List<ResourceType> getAllResourceTypes() {
        return resourceTypeRepository.findAll();
    }

    public ResponseEntity<ResourceType> getResourceTypeById(Long id) throws ResourceNotFoundException {
        ResourceType resourceType = resourceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource Type not found for this id :: " + id));
        return ResponseEntity.ok().body(resourceType);
    }

    public ResourceType createResourceType(ResourceType resourceType) {
        return resourceTypeRepository.save(resourceType);
    }

    public ResponseEntity<ResourceType> updateResourceType(Long id, ResourceType resourceTypeDetails)
            throws ResourceNotFoundException {

        ResourceType resourceType = resourceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource Type not found for this id :: " + id));

        resourceType.setName(resourceTypeDetails.getName());
        final ResourceType updatedResourceType = resourceTypeRepository.save(resourceType);
        return ResponseEntity.ok(updatedResourceType);
    }

    public Map<String, Boolean> deleteResourceType(Long id) throws ResourceNotFoundException {
        ResourceType resourceType = resourceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource Type not found for this id :: " + id));

        resourceTypeRepository.delete(resourceType);
        this.deleteResourceByResourceType(id);
        this.deleteTransportByResourceType(id);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    private void deleteResourceByResourceType(Long idResourceType) {
        List<Resource> resourcesToDelete = resourceService.getResourcesByIdResourceType(idResourceType);

        resourcesToDelete.forEach(resource -> {
            try {
                resourceService.deleteResource(resource.getId());
            } catch (ResourceNotFoundException e) {
                e.printStackTrace();
            }
        });
    }

    private void deleteTransportByResourceType(Long idResourceType) {
        List<Transport> transportsToDelete = transportService.getTransportsByIdResourceType(idResourceType);

        transportsToDelete.forEach(transport -> {
            try {
                transportService.deleteTransport(transport.getId());
            } catch (ResourceNotFoundException e) {
                e.printStackTrace();
            }
        });
    }

}
