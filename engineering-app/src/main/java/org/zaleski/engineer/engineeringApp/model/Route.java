package org.zaleski.engineer.engineeringApp.model;

import javax.persistence.*;

@Entity
@Table(name = "routes")
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "id_first_warehouse", nullable = false)
    private long idFirstWarehouse;

    public Route() {}

    public Route(String name) {
        this.name = name;
    }

    public Route(String name, long idFirstWarehouse) {
        this.name = name;
        this.idFirstWarehouse = idFirstWarehouse;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId_first_warehouse() {
        return idFirstWarehouse;
    }

    public void setId_first_warehouse(long idFirstWarehouse) {
        this.idFirstWarehouse = idFirstWarehouse;
    }

    @Override
    public String toString() {
        return "Route{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", id_first_warehouse=" + idFirstWarehouse +
                '}';
    }
}
