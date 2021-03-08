package com.edac.project.models.theater;

import com.edac.project.models.City;

public class Theater {

    private String theaterName;

    private String theaterAddress;

    private City city;

    public Theater() {
    }

    public Theater(String theaterName, String theaterAddress) {
        this.theaterName = theaterName;
        this.theaterAddress = theaterAddress;
    }

    public String getTheaterName() {
        return theaterName;
    }

    public void setTheaterName(String theaterName) {
        this.theaterName = theaterName;
    }

    public String getTheaterAddress() {
        return theaterAddress;
    }

    public void setTheaterAddress(String theaterAddress) {
        this.theaterAddress = theaterAddress;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }



}
