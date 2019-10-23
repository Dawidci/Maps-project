package org.zaleski.engineer.engineeringApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Resource;
import org.zaleski.engineer.engineeringApp.repository.ResourceRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ResourceService {

    @Autowired private ResourceRepository resourceRepository;

    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    public ResponseEntity<Resource> getResourceById(Long id) throws ResourceNotFoundException {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found for this id :: " + id));
        return ResponseEntity.ok().body(resource);
    }

    public List<Resource> getResourcesByIdWarehouse(Long idWarehouse) {
        return resourceRepository.findByIdWarehouse(idWarehouse);
    }

    public List<Resource> getResourcesByIdResourceType(Long idResourceType) {
        return resourceRepository.findByIdResourceType(idResourceType);
    }

    public ResponseEntity<Resource> getResourceByIdWarehouseAndIdResourceType(int idWarehouse, int idResourceType) {
        Resource resource = resourceRepository.findByIdWarehouseAndIdResourceType(idWarehouse, idResourceType);
        return ResponseEntity.ok().body(resource);
    }

    public Resource createResource(Resource resource) {
        return resourceRepository.save(resource);
    }

    public ResponseEntity<Resource> updateResource(Long id, Resource resourceDetails)
            throws ResourceNotFoundException {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found for this id :: " + id));

        resource.setIdResourceType(resourceDetails.getIdResourceType());
        resource.setIdWarehouse(resourceDetails.getIdWarehouse());
        resource.setQuantity(resourceDetails.getQuantity());

        final Resource updatedResource = resourceRepository.save(resource);
        return ResponseEntity.ok(updatedResource);
    }

    public Map<String, Boolean> deleteResource(Long id) throws ResourceNotFoundException {

        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found for this id :: " + id));

        resourceRepository.delete(resource);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }


}
