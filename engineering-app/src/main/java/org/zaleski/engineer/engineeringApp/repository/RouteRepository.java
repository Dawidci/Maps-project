package org.zaleski.engineer.engineeringApp.repository;

import org.zaleski.engineer.engineeringApp.model.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
    Route findByName(String name);
    List<Route> findByIdFirstWarehouse(long idFirstWarehouse);
}