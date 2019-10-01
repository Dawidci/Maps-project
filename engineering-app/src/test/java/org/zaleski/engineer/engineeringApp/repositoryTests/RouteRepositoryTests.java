package org.zaleski.engineer.engineeringApp.repositoryTests;

import org.zaleski.engineer.engineeringApp.model.Route;
import org.zaleski.engineer.engineeringApp.repository.RouteRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class RouteRepositoryTests {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private RouteRepository routeRepository;

    @Test
    public void repositoryFindByName() {
        Route first = new Route("First", 13);
        entityManager.persist(first);
        entityManager.flush();

        Route found = routeRepository.findByName(first.getName());
        Assert.assertEquals(found.getName(), first.getName());
    }
}
