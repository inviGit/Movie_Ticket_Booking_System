package com.edac.project.dao;

import com.edac.project.models.users.ApplicationUser;
import com.edac.project.models.users.Customer;
import com.edac.project.models.users.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerDao extends JpaRepository<Customer, Integer> {

    @Query("from Customer where applicationUser = :a")
    Customer findCustomerByApplicationUser(@Param("a") ApplicationUser applicationUser);

}
