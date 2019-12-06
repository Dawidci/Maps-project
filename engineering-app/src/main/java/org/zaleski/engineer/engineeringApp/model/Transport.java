package org.zaleski.engineer.engineeringApp.model;

import javax.persistence.*;

@Entity
@Table(name = "transports")
public class Transport {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "id_route", nullable = false)
    private long idRoute;

    @Column(name = "id_resource_type", nullable = false)
    private long idResourceType;

    @Column(name = "quantity", nullable = false)
    private long quantity;

    @Column(name = "no_trucks", nullable = false)
    private int noTrucks;

    @Column(name = "type", nullable = false)
    private String type;

    public Transport() {}

    public Transport(long idRoute, long idResourceType, long quantity, int noTrucks, String type) {
        this.idRoute = idRoute;
        this.idResourceType = idResourceType;
        this.quantity = quantity;
        this.noTrucks = noTrucks;
        this.type = type;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getIdRoute() {
        return idRoute;
    }

    public void setIdRoute(long idRoute) {
        this.idRoute = idRoute;
    }

    public long getIdResourceType() {
        return idResourceType;
    }

    public void setIdResourceType(long idResourceType) {
        this.idResourceType = idResourceType;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getNoTrucks() {
        return noTrucks;
    }

    public void setNoTrucks(int noTrucks) {
        this.noTrucks = noTrucks;
    }

    @Override
    public String toString() {
        return "Transport{" +
                "id=" + id +
                ", idRoute=" + idRoute +
                ", idResourceType=" + idResourceType +
                ", quantity=" + quantity +
                ", noTrucks=" + noTrucks +
                ", type=" + type +
                '}';
    }
}
