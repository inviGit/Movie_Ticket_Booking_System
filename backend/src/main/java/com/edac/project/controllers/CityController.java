package com.edac.project.controllers;

import com.edac.project.models.City;
import com.edac.project.models.common.ResponseResult;
import com.edac.project.service.CityService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
    @RequestMapping("/api/v1/city")
public class CityController {

    private final CityService cityService;

    public CityController(CityService cityService) {
        this.cityService = cityService;
    }


    @GetMapping("/{cityId}")
    public City getCityById(@PathVariable("cityId") Integer cityId){
        return cityService.getCityById(cityId);
    }

    @GetMapping("/all")
    public List<City> getAllCities(){
        return cityService.getAllCities();
    }

    @PutMapping("/add")
    public ResponseResult addCity(@RequestBody City city){
        return cityService.addCity(city);
    }

    @PostMapping("/update/{cityId}")
    public ResponseResult updateCity(@PathVariable("cityId") Integer cityId,
                                     @RequestBody City city){
        return cityService.updateCity(cityId, city);
    }

    @DeleteMapping("/remove/{cityId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseResult removeCity(@PathVariable("cityId") Integer cityId){
        return cityService.removeCityById(cityId);
    }


}
