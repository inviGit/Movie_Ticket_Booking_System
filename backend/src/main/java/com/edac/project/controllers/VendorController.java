package com.edac.project.controllers;

import com.edac.project.models.common.ResponseResult;
import com.edac.project.models.users.Vendor;
import com.edac.project.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/vendor")
public class VendorController {

    private final CityService cityService;

    @Autowired
    public VendorController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/{vendorId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_VENDOR')")
    public Vendor getVendor(@PathVariable("vendorId") Integer vendorId){
        return cityService.getVendorById(vendorId);
    }

    @GetMapping("/get-by-username/{username}")
    @PreAuthorize("hasRole('ROLE_VENDOR')")
    public Vendor getVendorByUserName(@PathVariable("username") String username){
        return cityService.getVendorByUserName(username);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<Vendor> getAllVendors(){
        return cityService.getAllVendors();
    }

    @PutMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseResult addVendor(@RequestBody Vendor vendor){
        return cityService.addVendor(vendor);
    }


    @PostMapping("/update/{vendorId}")
    @PreAuthorize("hasRole('ROLE_VENDOR')")
    public ResponseResult updateVendor(@PathVariable("vendorId") Integer vendorId,
                                         @RequestBody Vendor vendor){
        return cityService.updateVendor(vendorId, vendor);
    }

    @DeleteMapping("/remove/{vendorId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_VENDOR')")
    public ResponseResult removeVendor(@PathVariable("vendorId") Integer vendorId){
        return cityService.removeVendorById(vendorId);
    }


}
