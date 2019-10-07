package org.zaleski.engineer.engineeringApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.zaleski.engineer.engineeringApp.model.Transport;

@Repository
public interface TransportRepository extends JpaRepository<Transport, Long> {
    Transport findByIdRoute(long idRoute);
}
