package net.guides.springboot2.springboot2jpacrudexample.controller;

import net.guides.springboot2.springboot2jpacrudexample.exception.ResourceNotFoundException;
import net.guides.springboot2.springboot2jpacrudexample.model.Route;
import net.guides.springboot2.springboot2jpacrudexample.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/routes")
public class RouteController {

    @Autowired
    private RouteRepository routeRepository;

    @GetMapping("")
    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    @GetMapping("/test")
    public String test() {
        return "TEST";
    }

    @GetMapping("/{id}")
    public ResponseEntity<Route> getRouteById(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {
        Route route = routeRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Route not found for this id :: " + id));

        return ResponseEntity.ok().body(route);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Route> getRouteByName(@PathVariable(value = "name") String name)
            throws ResourceNotFoundException {
        Route route = routeRepository
                .findByName(name);

        return ResponseEntity.ok().body(route);
    }

    @PostMapping("")
    public Route createRoute(@Valid @RequestBody Route route) {
        return routeRepository.save(route);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Route> updateRoute(@PathVariable(value = "id") Long id,
                                                     @Valid @RequestBody Route routeDetails)
            throws ResourceNotFoundException {
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Route not found for this id :: " + id));

        route.setName(routeDetails.getName());

        final Route updatedRoute = routeRepository.save(route);

        return ResponseEntity.ok(updatedRoute);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteRoute(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {

        Route route = routeRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Route not found for this id :: " + id));

        routeRepository.delete(route);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }
}