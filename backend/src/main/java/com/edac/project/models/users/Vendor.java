package com.edac.project.models.users;

import com.edac.project.models.common.BaseEntity;
import com.edac.project.models.theater.Theater;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "vendor")
public class Vendor extends BaseEntity {

    @Column(name = "name", length = 20)
    private String name;

    @Column(name = "email", length = 50, unique = true, nullable = false)
    private String vendorEmail;

    @Column(name = "phoneNo")
    private Integer phoneNo;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "username", referencedColumnName = "username", unique = true)
    private ApplicationUser applicationUser;

    @OneToMany(mappedBy="vendor",
            orphanRemoval = true)
    private List<Theater> theaters;

    public Vendor() {
    }

    public Vendor(String name, String vendorEmail, Integer phoneNo) {
        this.name = name;
        this.vendorEmail = vendorEmail;
        this.phoneNo = phoneNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVendorEmail() {
        return vendorEmail;
    }

    public void setVendorEmail(String vendorEmail) {
        this.vendorEmail = vendorEmail;
    }

    public Integer getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(Integer phoneNo) {
        this.phoneNo = phoneNo;
    }

    public ApplicationUser getApplicationUser() {
        return applicationUser;
    }

    public void setApplicationUser(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
    }

    public List<Theater> getTheaters() {
        return theaters;
    }

    public void setTheaters(List<Theater> theaters) {
        this.theaters = theaters;
    }

    public void addTheater(Theater theater) {
        theaters.add(theater);
        theater.setVendor(this);
    }

    public void removeTheater(Theater theater) {
        theaters.remove(theater);
        theater.setVendor(null);
    }
}

