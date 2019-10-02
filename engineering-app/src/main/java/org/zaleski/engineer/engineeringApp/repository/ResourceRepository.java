package org.zaleski.engineer.engineeringApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.zaleski.engineer.engineeringApp.model.Resource;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findByIdWarehouse(long idWarehouse);
    List<Resource> findByIdResourceType(long idResourceType);
    Resource findByIdWarehouseAndIdResourceType (long idWarehouse, long idResourceType);
}
