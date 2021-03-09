package com.edac.project.models.users;

import com.edac.project.models.common.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "customer")
public class Customer extends BaseEntity {

    @Column(name = "name", length = 20)
    private String name;

    @Column(name = "email", length = 50, unique=true)
    private String email;

    @Column(name = "phone_no", length = 20)
    private Integer phoneNo;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "username", referencedColumnName = "username", unique = true)
    private ApplicationUser applicationUser;


    public Customer() {
    }

    public Customer(@NotBlank(message = "CustomerName is required") String name,
                    @NotBlank(message = "CustomerEmail is required") String email,
                    @NotBlank(message = "phoneNo is required") Integer phoneNo) {
        this.name = name;
        this.email = email;
        this.phoneNo = phoneNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
}
