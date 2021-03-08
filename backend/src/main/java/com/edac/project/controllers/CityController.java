package com.edac.project.controllers;

import com.edac.project.models.City;
import com.edac.project.models.common.ResponseResult;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
    @RequestMapping("/api/v1/city")
public class CityController {


    @GetMapping("/{cityId}")
    public City getCityById(@PathVariable("cityId") Integer cityId){
        City city = new City("Delhi", 110006, "Delhi");
        return city;
    }

    @GetMapping("/all")
    public List<City> getAllCities(){
        List<City> cities = new ArrayList<>();
        City city = new City("Delhi", 110006, "Delhi");
        cities.add(city);
        return cities;
    }

    @PutMapping("/add")
    public ResponseResult addCity(@RequestBody City city){
        ResponseResult responseResult = new ResponseResult(1, "success", city);
        return responseResult;
    }

    @PostMapping("/update/{cityId}")
    public ResponseResult updateCity(@PathVariable("cityId") Integer cityId,
                                     @RequestBody City city){
        ResponseResult responseResult = new ResponseResult(1, "success", city);
        return responseResult;
    }

    @DeleteMapping("/remove/{cityId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseResult removeCity(@PathVariable("cityId") Integer cityId){
        ResponseResult responseResult = new ResponseResult(1, "success", null);
        return responseResult;
    }


}
