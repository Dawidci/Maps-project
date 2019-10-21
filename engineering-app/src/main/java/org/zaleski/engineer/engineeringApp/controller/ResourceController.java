package org.zaleski.engineer.engineeringApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Resource;
import org.zaleski.engineer.engineeringApp.repository.ResourceRepository;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/resources")
public class ResourceController {

    @Autowired
    private ResourceRepository resourceRepository;

    @GetMapping("")
    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> getResourceById(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {
        Resource resource = resourceRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found for this id :: " + id));

        return ResponseEntity.ok().body(resource);
    }

    @GetMapping("/warehouse/{idWarehouse}")
    public List<Resource> getResourcesByIdWarehouse(@PathVariable(value = "idWarehouse") Long idWarehouse) {
        List<Resource> resources = resourceRepository.findByIdWarehouse(idWarehouse);
        return resources;
    }

    @GetMapping("/resource-type/{idResourceType}")
    public List<Resource> getResourcesByIdResourceType(@PathVariable(value = "idResourceType") Long idResourceType) {
        List<Resource> resources = resourceRepository.findByIdResourceType(idResourceType);
        return resources;
    }

    @GetMapping("/warehouse/{idWarehouse}/resource-type/{idResourceType}")
    public ResponseEntity<Resource> getResourceByIdWarehouseAndIdResourceType(
            @PathVariable(value = "idWarehouse") int idWarehouse,
            @PathVariable(value = "idResourceType") int idResourceType) {

        Resource resource = resourceRepository.findByIdWarehouseAndIdResourceType(idWarehouse, idResourceType);
        return ResponseEntity.ok().body(resource);
    }

    @PostMapping("")
    public Resource createResource(@Valid @RequestBody Resource resource) {
        return resourceRepository.save(resource);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Resource> updateResource(@PathVariable(value = "id") Long id,
                                                     @Valid @RequestBody Resource resourceDetails)
            throws ResourceNotFoundException {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found for this id :: " + id));

        resource.setIdResourceType(resourceDetails.getIdResourceType());
        resource.setIdWarehouse(resourceDetails.getIdWarehouse());
        resource.setQuantity(resourceDetails.getQuantity());

        final Resource updatedResource = resourceRepository.save(resource);

        return ResponseEntity.ok(updatedResource);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteResource(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {

        Resource resource = resourceRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found for this id :: " + id));

        resourceRepository.delete(resource);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }
}
