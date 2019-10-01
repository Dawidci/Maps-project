package org.zaleski.engineer.engineeringApp.model;

import javax.persistence.*;

@Entity
@Table(name = "destinations")
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "id_route", nullable = false)
    private long idRoute;

    @Column(name = "id_warehouse", nullable = false)
    private long id_warehouse;

    @Column(name = "destination_order", nullable = false)
    private long order;

    public Destination() {}

    public Destination(long id_route, long id_warehouse, long order) {
        this.idRoute = id_route;
        this.id_warehouse = id_warehouse;
        this.order = order;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId_route() {
        return idRoute;
    }

    public void setId_route(long id_route) {
        this.idRoute = id_route;
    }

    public long getId_warehouse() {
        return id_warehouse;
    }

    public void setId_warehouse(long id_warehouse) {
        this.id_warehouse = id_warehouse;
    }

    public long getOrder() {
        return order;
    }

    public void setOrder(long order) {
        this.order = order;
    }

    @Override
    public String toString() {
        return "Destination{" +
                "id=" + id +
                ", id_route=" + idRoute +
                ", id_warehouse=" + id_warehouse +
                ", order=" + order +
                '}';
    }
}
