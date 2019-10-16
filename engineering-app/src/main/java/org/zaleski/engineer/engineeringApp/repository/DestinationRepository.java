package org.zaleski.engineer.engineeringApp.repository;

import org.zaleski.engineer.engineeringApp.model.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long>{
    List<Destination> findByIdRoute(long idRoute);
    List<Destination> findByIdWarehouse(long idWarehouse);
}
