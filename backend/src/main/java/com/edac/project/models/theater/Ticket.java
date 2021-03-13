package com.edac.project.models.theater;

import com.edac.project.models.City;
import com.edac.project.models.common.BaseEntity;
import com.edac.project.models.users.Customer;
import com.edac.project.models.users.Vendor;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "ticket")
public class Ticket extends BaseEntity {

    @Column(name = "seat_number", length = 10, nullable = false)
    private int seatNo;

    @ManyToOne(fetch= FetchType.LAZY)
    private Show show;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "customerId", referencedColumnName = "id", unique = true)
    private Customer customer;


    public Ticket() {
    }

    public int getSeatNo() {
        return seatNo;
    }

    public void setSeatNo(int seatNo) {
        this.seatNo = seatNo;
    }

    public Show getShow() {
        return show;
    }

    public void setShow(Show show) {
        this.show = show;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Ticket )) return false;
        return getId() != null && getId().equals(((Ticket) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
