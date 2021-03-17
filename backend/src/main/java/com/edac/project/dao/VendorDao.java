package com.edac.project.dao;

import com.edac.project.models.users.ApplicationUser;
import com.edac.project.models.users.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VendorDao extends JpaRepository<Vendor, Integer> {

    @Query("from Vendor where applicationUser = :a")
    Vendor findVendorByApplicationUser(@Param("a") ApplicationUser applicationUser);

}
