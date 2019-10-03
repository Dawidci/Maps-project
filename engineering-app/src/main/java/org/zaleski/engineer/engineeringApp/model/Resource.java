package org.zaleski.engineer.engineeringApp.model;

import javax.persistence.*;

@Entity
@Table(name = "resources")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "id_resource_type", nullable = false)
    private long idResourceType;

    @Column(name = "id_warehouse", nullable = false)
    private long idWarehouse;

    @Column(name = "quantity", nullable = false)
    private long quantity;

    public Resource() {}

    public Resource(long idResourceType, long idWarehouse, long quantity) {
        this.idResourceType = idResourceType;
        this.idWarehouse = idWarehouse;
        this.quantity = quantity;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getIdResourceType() {
        return idResourceType;
    }

    public void setIdResourceType(long idResourceType) {
        this.idResourceType = idResourceType;
    }

    public long getIdWarehouse() {
        return idWarehouse;
    }

    public void setIdWarehouse(long idWarehouse) {
        this.idWarehouse = idWarehouse;
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
                ", idWarehouse=" + idWarehouse +
                ", quantity=" + quantity +
                '}';
    }
}
