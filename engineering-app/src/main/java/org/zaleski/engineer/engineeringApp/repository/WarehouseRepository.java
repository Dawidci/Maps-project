package org.zaleski.engineer.engineeringApp.repository;

import org.zaleski.engineer.engineeringApp.model.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Long>{

}