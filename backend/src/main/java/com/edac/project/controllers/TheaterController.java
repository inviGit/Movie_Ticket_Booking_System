package com.edac.project.controllers;

import com.edac.project.models.ResponseResult;
import com.edac.project.models.Theater;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/theater")
public class TheaterController {

    @GetMapping("/{theaterId}")
    public Theater getTheater(@PathVariable("theaterId") Integer theaterId){
        Theater theater = new Theater("DD Cinema", "road");
        return theater;
    }

    @GetMapping("/all")
    public List<Theater> getAllTheaters(){
        List<Theater> theaters = new ArrayList<>();
        Theater theater = new Theater("DD Cinema", "road");
        theaters.add(theater);
        return theaters;
    }

    @PutMapping("/add/{cityId}/{vendorId}")
    public ResponseResult addTheater(@PathVariable("cityId") Integer cityId,
                                     @PathVariable("vendorId") Integer vendorId,
                                     @RequestBody Theater theater){
        ResponseResult responseResult = new ResponseResult(1, "success", theater);
        return responseResult;
    }

    @PostMapping("/update/{theaterId}")
    public ResponseResult updateTheater(@PathVariable("theaterId") Integer theaterId,
                                        @RequestBody Theater theater){
        ResponseResult responseResult = new ResponseResult(1, "success", theater);
        return responseResult;
    }

    @DeleteMapping("/remove/{theaterId}")
    public ResponseResult removeTheater(@PathVariable("theaterId") Integer theaterId){
        ResponseResult responseResult = new ResponseResult(1, "success", null);
        return responseResult;
    }





}
