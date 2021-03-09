package com.edac.project.controllers;

import com.edac.project.models.common.ResponseResult;
import com.edac.project.models.theater.Show;
import com.edac.project.service.CityService;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/show")
public class ShowController {

    private final CityService cityService;

    public ShowController(CityService cityService) {
        this.cityService = cityService;
    }


    @GetMapping("/{showId}")
    public Show getShow(@PathVariable("showId") Integer showId){
        return cityService.getShowById(showId);
    }

    @PutMapping("/add/{movieId}")
    public ResponseResult addShowToTheater(@PathVariable("movieId") Integer movieId,
                                           @RequestBody Show show){
        return cityService.addShowToTheater(movieId, show);
    }

    @PostMapping("/update/{showId}")
    public ResponseResult updateShowToTheater(@PathVariable("showId") Integer showId,
                                              @RequestBody Show show){
        return  cityService.updateShowToTheater(showId, show);
    }

    @DeleteMapping("/remove/{showId}")
    public ResponseResult removeShowFromTheater(@PathVariable("showId") Integer showId){
        return cityService.removeShowFromTheater(showId);
    }
}
