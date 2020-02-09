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
    private long idWarehouse;

    @Column(name = "destination_order", nullable = false)
    private long order;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    public Destination() {}

    public Destination(long id_route, long id_warehouse, long order, int quantity) {
        this.idRoute = id_route;
        this.idWarehouse = id_warehouse;
        this.order = order;
        this.quantity = quantity;
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
        return idWarehouse;
    }

    public void setId_warehouse(long id_warehouse) {
        this.idWarehouse = id_warehouse;
    }

    public long getOrder() {
        return order;
    }

    public void setOrder(long order) {
        this.order = order;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "Destination{" +
                "id=" + id +
                ", id_route=" + idRoute +
                ", id_warehouse=" + idWarehouse +
                ", order=" + order +
                ", quantity" + quantity +
                '}';
    }
}
