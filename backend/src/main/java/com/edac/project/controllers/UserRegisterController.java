package com.edac.project.controllers;

import com.edac.project.dao.ApplicationUserDao;
import com.edac.project.models.common.ResponseResult;
import com.edac.project.models.users.ApplicationUser;
import com.edac.project.models.users.Customer;
import com.edac.project.security.ApplicationUserRole;
import com.edac.project.security.PasswordConfig;
import com.edac.project.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/register")
public class UserRegisterController {

    private final CityService cityService;
    private final ApplicationUserDao applicationUserDao;


    @Autowired
    public UserRegisterController(CityService cityService,
                                  ApplicationUserDao applicationUserDao) {
        this.cityService = cityService;
        this.applicationUserDao = applicationUserDao;
    }

    //HARD CODED
    @PutMapping("/admin")
    public String registerAdminHard(){
        ApplicationUser applicationUser = new ApplicationUser(
                "anna",
                "password",
                ApplicationUserRole.ADMIN,
                true,
                true,
                true,
                true
        );
        PasswordConfig passwordConfig = new PasswordConfig();
        applicationUser.setPassword(passwordConfig.passwordEncoder().encode("password"));
        applicationUserDao.save(applicationUser);
        return "hi";
    }

    @PutMapping("/customer")
    public ResponseResult registerCustomer(@RequestBody ApplicationUser applicationUser){
        Customer customer = new Customer();
        return cityService.registerCustomer(applicationUser, customer);
    }

    @PutMapping("/vendor/{vendorId}")
    public ResponseResult registerVendor(@PathVariable("vendorId") Integer vendorId,
                                         @RequestBody ApplicationUser applicationUser){
        return cityService.registerVendor(vendorId, applicationUser);
    }
}
