package org.zaleski.engineer.engineeringApp.repositoryTests;

import org.zaleski.engineer.engineeringApp.model.Destination;
import org.zaleski.engineer.engineeringApp.repository.DestinationRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@DataJpaTest
public class DestinationRepositoryTests {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private DestinationRepository destinationRepository;

    @Test
    public void repositoryFindByIdRoute() {

        Destination first = new Destination(1, 1, 1, 1);
        List<Destination> destinations = new ArrayList<>();
        destinations.add(first);

        entityManager.persist(first);
        entityManager.flush();

        List<Destination> found = destinationRepository.findByIdRoute(1);
        Assert.assertEquals(found, destinations);
    }

}