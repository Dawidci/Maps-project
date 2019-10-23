package org.zaleski.engineer.engineeringApp.controller;

import org.zaleski.engineer.engineeringApp.exception.ResourceNotFoundException;
import org.zaleski.engineer.engineeringApp.model.Route;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zaleski.engineer.engineeringApp.service.RouteService;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/routes")
public class RouteController {

    @Autowired private RouteService routeService;

    @GetMapping("")
    public List<Route> getAllRoutes() {
        return routeService.getAllRoutes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Route> getRouteById(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        return routeService.getRouteById(id);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Route> getRouteByName(@PathVariable(value = "name") String name) {
        return routeService.getRouteByName(name);
    }

    @GetMapping("/warehouse/{idFirstWarehouse}")
    public List<Route> getRoutesByIdFirstWarehouse(@PathVariable(value = "idFirstWarehouse") long idFirstWarehouse) {
        return routeService.getRoutesByIdFirstWarehouse(idFirstWarehouse);
    }

    @PostMapping("")
    public Route createRoute(@Valid @RequestBody Route route) {
        return routeService.createRoute(route);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Route> updateRoute(@PathVariable(value = "id") Long id, @Valid @RequestBody Route routeDetails)
            throws ResourceNotFoundException {
        return routeService.updateRoute(id, routeDetails);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteRoute(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        return routeService.deleteRoute(id);
    }
}