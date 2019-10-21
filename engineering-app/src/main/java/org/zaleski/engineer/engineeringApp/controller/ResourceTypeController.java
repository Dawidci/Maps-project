package org.zaleski.engineer.engineeringApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Resource;
import org.zaleski.engineer.engineeringApp.model.ResourceType;
import org.zaleski.engineer.engineeringApp.model.Transport;
import org.zaleski.engineer.engineeringApp.repository.ResourceTypeRepository;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/resource_types")
public class ResourceTypeController {

    @Autowired
    private ResourceTypeRepository resourceTypeRepository;

    @Autowired
    private ResourceController resourceController;

    @Autowired
    private TransportController transportController;

    @GetMapping("")
    public List<ResourceType> getAllResourceTypes() {
        return resourceTypeRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResourceType> getResourceTypeById(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        ResourceType resourceType = resourceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource Type not found for this id :: " + id));

        return ResponseEntity.ok().body(resourceType);
    }

    @PostMapping("")
    public ResourceType createResourceType(@Valid @RequestBody ResourceType resourceType) {
        return resourceTypeRepository.save(resourceType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResourceType> updateResourceType(@PathVariable(value = "id") Long id,
                                             @Valid @RequestBody ResourceType resourceTypeDetails)
            throws ResourceNotFoundException {

        ResourceType resourceType = resourceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Route not found for this id :: " + id));

        resourceType.setName(resourceTypeDetails.getName());
        final ResourceType updatedResourceType = resourceTypeRepository.save(resourceType);
        return ResponseEntity.ok(updatedResourceType);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteResourceType(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {

        ResourceType resourceType = resourceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Route not found for this id :: " + id));

        resourceTypeRepository.delete(resourceType);

        List<Resource> resourcesToDelete = resourceController.getResourcesByIdResourceType(id);
        List<Transport> transportsToDelete = transportController.getTransportsByIdResourceType(id);

        resourcesToDelete.forEach(resource -> {
            try {
                resourceController.deleteResource(resource.getId());
            } catch (ResourceNotFoundException e) {
                e.printStackTrace();
            }
        });

        transportsToDelete.forEach(transport -> {
            try {
                transportController.deleteTransport(transport.getId());
            } catch (ResourceNotFoundException e) {
                e.printStackTrace();
            }
        });

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }
}
