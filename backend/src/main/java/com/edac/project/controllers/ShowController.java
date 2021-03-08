package com.edac.project.controllers;

import com.edac.project.models.common.ResponseResult;
import com.edac.project.models.theater.Show;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/show")
public class ShowController {


    @GetMapping("/{showId}")
    public Show getShow(@PathVariable("showId") Integer showId){
        Show show = new Show("11:30");
        return show;
    }

    @PutMapping("/add/{movieId}")
    public ResponseResult addShowToTheater(@PathVariable("movieId") Integer movieId,
                                           @RequestBody Show show){
        ResponseResult responseResult = new ResponseResult(1, "success", show);
        return responseResult;
    }

    @PostMapping("/update/{showId}")
    public ResponseResult updateShowToTheater(@PathVariable("showId") Integer showId,
                                              @RequestBody Show show){
        ResponseResult responseResult = new ResponseResult(1, "success", show);
        return responseResult;    }

    @DeleteMapping("/remove/{showId}")
    public ResponseResult removeShowFromTheater(@PathVariable("showId") Integer showId){
        ResponseResult responseResult = new ResponseResult(1, "success", null);
        return responseResult;
    }
}
