package com.edac.project.controllers;

import com.edac.project.models.City;
import com.edac.project.models.common.ResponseResult;
import com.edac.project.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/city")
public class CityController {

    private final CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/{cityId}")
    @PermitAll
    public City getCityById(@PathVariable("cityId") Integer cityId){
        return cityService.getCityById(cityId);
    }

    @GetMapping("/all")
    @PermitAll
    public List<City> getAllCities(){
        return cityService.getAllCities();
    }

    @PutMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseResult addCity(@RequestBody City city){
        System.out.println("city "+city.getCityName());
        return cityService.addCity(city);
    }

    @PostMapping("/update/{cityId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseResult updateCity(@PathVariable("cityId") Integer cityId,
                                     @RequestBody City city){
        return cityService.updateCity(cityId, city) ;
    }

    @DeleteMapping("/remove/{cityId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseResult removeCity(@PathVariable("cityId") Integer cityId){
        return cityService.removeCityById(cityId);
    }


}
