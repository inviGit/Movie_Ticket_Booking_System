package com.edac.project.models.theater;

import com.edac.project.models.common.BaseEntity;
import com.edac.project.models.users.Vendor;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Arrays;

@Entity
@Table(name = "seating")
public class Seating extends BaseEntity {

    @Column(name = "seats", length = 200)
    private short[][] seats = new short[12][12];

    @JsonIgnore
    @OneToOne(mappedBy = "seating",
            orphanRemoval = true)
    private Show show;

    public Seating() {
    }

    public Seating(short[][] seats) {
        this.seats = seats;
    }

    public short[][] getSeats() {
        return seats;
    }

    public void setSeats(short[][] seats) {
        this.seats = seats;
    }

    public Show getShow() {
        return show;
    }

    public void setShow(Show show) {
        this.show = show;
    }
}
