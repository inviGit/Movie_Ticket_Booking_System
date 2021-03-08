package com.edac.project.models;

import javax.persistence.*;
import java.util.List;

public class City {

    private Integer pincode;

    private String cityName;

    private String stateName;

    private List<Theater> theaters;

    public City() {
    }

    public City( String cityName,
                 Integer pincode,
                 String stateName) {
        this.cityName = cityName;
        this.pincode = pincode;
        this.stateName = stateName;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public Integer getPincode() {
        return pincode;
    }

    public void setPincode(Integer pincode) {
        this.pincode = pincode;
    }

    public String getStateName() {
        return stateName;
    }

    public void setStateName(String stateName) {
        this.stateName = stateName;
    }

    public List<Theater> getTheaters() {
        return theaters;
    }

    public void setTheaters(List<Theater> theaters) {
        this.theaters = theaters;
    }

    public void addTheater(Theater theater) {
        theaters.add(theater);
        theater.setCity(this);
    }

    public void removeTheater(Theater theater) {
        theaters.remove(theater);
        theater.setCity(null);
    }

}
