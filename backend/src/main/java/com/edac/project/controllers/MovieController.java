package com.edac.project.controllers;


import com.edac.project.models.common.ResponseResult;
import com.edac.project.models.movie.GenreList;
import com.edac.project.models.movie.LanguageList;
import com.edac.project.models.movie.Movie;

import com.edac.project.service.CityService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@RestController
@RequestMapping("/api/v1/movie")
public class MovieController {

    private final CityService cityService;

    public MovieController(CityService cityService) {
        this.cityService = cityService;
    }


    @GetMapping("/{movieId}")
    public Movie getMovie(@PathVariable("movieId") Integer movieId){
        return cityService.getMovieById(movieId);
    }

    @GetMapping("/all")
    public List<Movie> getAllMovies(){
        return cityService.getAllMovies();
    }

    @PutMapping("/add_movie_to_theater/{theaterId}")
    public ResponseResult addMovieToTheater(@PathVariable("theaterId") Integer theaterId,
                                            @RequestBody Movie movie){
        return cityService.addMovieToTheater(theaterId, movie);
    }

    @PostMapping("/update/{movieId}")
    public ResponseResult updateMovie(@PathVariable("movieId") Integer movieId,
                                      @RequestBody Movie movie){
        return cityService.updateMovie(movieId, movie);
    }

    @DeleteMapping("/remove_movie_from_theater")
    public ResponseResult removeMovieFromTheater(@RequestParam("movieId") Integer movieId){
        return cityService.removeMovieFromTheater(movieId);
    }


}
