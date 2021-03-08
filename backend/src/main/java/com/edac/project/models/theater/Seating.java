package com.edac.project.models.theater;


public class Seating {

    private short[][] seats = new short[12][12];

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
