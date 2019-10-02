package org.zaleski.engineer.engineeringApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.zaleski.engineer.engineeringApp.model.ResourceType;

@Repository
public interface ResourceTypeRepository extends JpaRepository<ResourceType, Long> {
}
