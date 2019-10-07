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

    public Transport() {}

    public Transport(long idRoute, long idResourceType, long quantity) {
        this.idRoute = idRoute;
        this.idResourceType = idResourceType;
        this.quantity = quantity;
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

    @Override
    public String toString() {
        return "Resource{" +
                "id=" + id +
                ", idResourceType=" + idResourceType +
                ", idRoute=" + idRoute +
                ", quantity=" + quantity +
                '}';
    }
}
