package org.zaleski.engineer.engineeringApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.ResourceType;
import org.zaleski.engineer.engineeringApp.service.ResourceTypeService;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/resource_types")
public class ResourceTypeController {

    @Autowired private ResourceTypeService resourceTypeService;

    @GetMapping("")
    public List<ResourceType> getAllResourceTypes() {
        return resourceTypeService.getAllResourceTypes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResourceType> getResourceTypeById(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {
        return resourceTypeService.getResourceTypeById(id);
    }

    @PostMapping("")
    public ResourceType createResourceType(@Valid @RequestBody ResourceType resourceType) {
        return resourceTypeService.createResourceType(resourceType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResourceType> updateResourceType(@PathVariable(value = "id") Long id,
                                                           @Valid @RequestBody ResourceType resourceTypeDetails)
            throws ResourceNotFoundException {
        return resourceTypeService.updateResourceType(id, resourceTypeDetails);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteResourceType(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        return resourceTypeService.deleteResourceType(id);
    }
}
