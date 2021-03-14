package com.edac.project.models.theater;

import com.edac.project.models.City;
import com.edac.project.models.common.BaseEntity;
import com.edac.project.models.users.Customer;
import com.edac.project.models.users.Vendor;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "ticket")
public class Ticket extends BaseEntity {

    @Column(name = "seat_number", length = 10, nullable = false)
    private String seatNo;

    @ManyToOne(fetch= FetchType.LAZY)
    private Show show;

    @JsonIgnore
    @ManyToOne(fetch= FetchType.LAZY)
    private Customer customer;


    public Ticket() {
    }

    public Ticket(String seatNo) {
        this.seatNo = seatNo;
    }

    public String getSeatNo() {
        return seatNo;
    }

    public void setSeatNo(String seatNo) {
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
