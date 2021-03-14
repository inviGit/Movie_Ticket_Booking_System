package com.edac.project.controllers;

import com.edac.project.models.common.ResponseResult;
import com.edac.project.models.theater.Show;
import com.edac.project.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/show")
public class ShowController {

    private final CityService cityService;

    @Autowired
    public ShowController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/{showId}")
    @PermitAll
    public Show getShow(@PathVariable("showId") Integer showId){
        return cityService.getShowById(showId);
    }

    @PutMapping("/add/{movieId}")
    @PreAuthorize("hasRole('ROLE_VENDOR')")
    public ResponseResult addShowToTheater(@PathVariable("movieId") Integer movieId,
                                           @RequestBody Show show){
        return cityService.addShowToTheater(movieId, show);
    }

    //    @Valid
    @PostMapping("/update/{showId}")
    @PreAuthorize("hasRole('ROLE_VENDOR')")
    public ResponseResult updateShowToTheater(@PathVariable("showId") Integer showId,
                                              @RequestBody Show show){
        return cityService.updateShowToTheater(showId, show);
    }

    @DeleteMapping("/remove/{showId}")
    @PreAuthorize("hasRole('ROLE_VENDOR')")
    public ResponseResult removeShowFromTheater(@PathVariable("showId") Integer showId){
        return cityService.removeShowFromTheater(showId);
    }
}
