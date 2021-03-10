package com.edac.project.controllers;

import com.edac.project.models.common.ResponseResult;
import com.edac.project.models.movie.Movie;
import com.edac.project.models.theater.Show;
import com.edac.project.models.theater.Theater;
import com.edac.project.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/theater")
public class TheaterController {

    private final CityService cityService;

    @Autowired
    public TheaterController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/{theaterId}")
    @PermitAll
    public Theater getTheater(@PathVariable("theaterId") Integer theaterId){
        return cityService.getTheaterById(theaterId);
    }

    @GetMapping("/all")
    @PermitAll
    public List<Theater> getAllTheaters(){
        return cityService.getAllTheaters();
    }

    @PutMapping("/add/{cityId}/{vendorId}")
    @PreAuthorize("hasRole('ROLE_VENDOR')")
    public ResponseResult addTheater(@PathVariable("cityId") Integer cityId,
                                     @PathVariable("vendorId") Integer vendorId,
                                     @RequestBody Theater theater){
        return cityService.addTheater(cityId, vendorId, theater);
    }

    @PostMapping("/update/{theaterId}")
    @PreAuthorize("hasRole('ROLE_VENDOR')")
    public ResponseResult updateTheater(@PathVariable("theaterId") Integer theaterId,
                                        @RequestBody Theater theater){
        return cityService.updateTheater(theaterId, theater);
    }

    @DeleteMapping("/remove/{theaterId}")
    @PreAuthorize("hasRole('ROLE_VENDOR')")
    public ResponseResult removeTheater(@PathVariable("theaterId") Integer theaterId){
        return cityService.removeTheaterById(theaterId);
    }





}
