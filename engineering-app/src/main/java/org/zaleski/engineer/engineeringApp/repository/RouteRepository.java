package org.zaleski.engineer.engineeringApp.repository;

import org.zaleski.engineer.engineeringApp.model.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
    Route findByName(String name);
}