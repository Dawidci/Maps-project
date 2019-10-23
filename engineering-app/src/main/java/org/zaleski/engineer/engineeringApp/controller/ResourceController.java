package org.zaleski.engineer.engineeringApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Resource;
import org.zaleski.engineer.engineeringApp.service.ResourceService;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/resources")
public class ResourceController {

    @Autowired private ResourceService resourceService;

    @GetMapping("")
    public List<Resource> getAllResources() {
        return resourceService.getAllResources();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> getResourceById(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {
        return resourceService.getResourceById(id);
    }

    @GetMapping("/warehouse/{idWarehouse}")
    public List<Resource> getResourcesByIdWarehouse(@PathVariable(value = "idWarehouse") Long idWarehouse) {
        return resourceService.getResourcesByIdWarehouse(idWarehouse);
    }

    @GetMapping("/resource-type/{idResourceType}")
    public List<Resource> getResourcesByIdResourceType(@PathVariable(value = "idResourceType") Long idResourceType) {
        return resourceService.getResourcesByIdResourceType(idResourceType);
    }

    @GetMapping("/warehouse/{idWarehouse}/resource-type/{idResourceType}")
    public ResponseEntity<Resource> getResourceByIdWarehouseAndIdResourceType(
            @PathVariable(value = "idWarehouse") int idWarehouse,
            @PathVariable(value = "idResourceType") int idResourceType) {
        return resourceService.getResourceByIdWarehouseAndIdResourceType(idWarehouse, idResourceType);
    }

    @PostMapping("")
    public Resource createResource(@Valid @RequestBody Resource resource) {
        return resourceService.createResource(resource);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Resource> updateResource(@PathVariable(value = "id") Long id,
                                                     @Valid @RequestBody Resource resourceDetails)
            throws ResourceNotFoundException {
        return resourceService.updateResource(id, resourceDetails);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteResource(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {
        return resourceService.deleteResource(id);
    }
}
