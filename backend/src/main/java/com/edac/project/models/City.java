package com.edac.project.models;

import com.edac.project.models.theater.Theater;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "city")
public class City {

    @Id
    @Column(name = "city_pincode", nullable = false, unique = true)
    private Integer pincode;

    @Column(name = "city_name", length = 20, nullable = false)
    private String cityName;

    @Column(name = "state_name", length = 20, nullable = false)
    private String stateName;

    @OneToMany(mappedBy="city",
            orphanRemoval = true)
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
