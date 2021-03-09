package com.edac.project.controllers;

import com.edac.project.models.common.ResponseResult;
import com.edac.project.models.theater.Theater;
import com.edac.project.service.CityService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/theater")
public class TheaterController {

    private final CityService cityService;

    public TheaterController(CityService cityService) {
        this.cityService = cityService;
    }


    @GetMapping("/{theaterId}")
    public Theater getTheater(@PathVariable("theaterId") Integer theaterId){
        return cityService.getTheaterById(theaterId);
    }

    @GetMapping("/all")
    public List<Theater> getAllTheaters(){
        return cityService.getAllTheaters();
    }

    @PutMapping("/add/{cityId}/{vendorId}")
    public ResponseResult addTheater(@PathVariable("cityId") Integer cityId,
                                     @PathVariable("vendorId") Integer vendorId,
                                     @RequestBody Theater theater){
        return cityService.addTheater(cityId, vendorId, theater);
    }

    @PostMapping("/update/{theaterId}")
    public ResponseResult updateTheater(@PathVariable("theaterId") Integer theaterId,
                                        @RequestBody Theater theater){
        return cityService.updateTheater(theaterId, theater);
    }

    @DeleteMapping("/remove/{theaterId}")
    public ResponseResult removeTheater(@PathVariable("theaterId") Integer theaterId){
        return cityService.removeTheaterById(theaterId);
    }





}
