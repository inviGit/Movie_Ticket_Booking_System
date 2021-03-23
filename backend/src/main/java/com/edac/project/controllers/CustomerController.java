package com.edac.project.controllers;

import com.edac.project.models.users.ApplicationUser;
import com.edac.project.models.users.Customer;
import com.edac.project.models.common.ResponseResult;
import com.edac.project.models.users.Vendor;
import com.edac.project.security.ApplicationUserRole;
import com.edac.project.security.PasswordConfig;
import com.edac.project.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/customer")
public class CustomerController {

    private final CityService cityService;

    @Autowired
    public CustomerController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/{customerId}")
    @PreAuthorize("hasAnyRole('ROLE_CUSTOMER', 'ROLE_ADMIN')")
    public Customer getCustomerById(@PathVariable("customerId") Integer customerId){
        return cityService.getCustomerById(customerId);
    }

    @GetMapping("/get-by-username/{username}")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public Customer getCustomerByUserName(@PathVariable("username") String username){
        return cityService.getCustomerByUserName(username);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<Customer> getAllCustomers(){
        return cityService.getAllCustomers();
    }

    @PostMapping("/update/{customerId}")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseResult updateCustomer(@PathVariable("customerId") Integer customerId,
                                         @RequestBody Customer customer){
        return cityService.updateCustomer(customerId, customer);
    }

    @DeleteMapping("/remove/{customerId}")
    @PreAuthorize("hasRole('ROLE_ADMIN', 'ROLE_CUSTOMER')")
    public ResponseResult removeCustomer(@PathVariable("customerId") Integer customerId){
        return cityService.removeCustomerById(customerId);
    }

}
