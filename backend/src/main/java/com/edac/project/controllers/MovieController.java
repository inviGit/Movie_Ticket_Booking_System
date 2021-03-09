package com.edac.project.controllers;

import com.edac.project.models.movie.Movie;
import com.edac.project.models.common.ResponseResult;
import com.edac.project.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/movie")
public class MovieController {

    private final CityService cityService;

    @Autowired
    public MovieController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/{movieId}")
    @PermitAll
    public Movie getMovie(@PathVariable("movieId") Integer movieId){
        return cityService.getMovieById(movieId);
    }

    @GetMapping("/all")
    @PermitAll
    public List<Movie> getAllMovies(){
        return cityService.getAllMovies();
    }

    @PutMapping("/add_movie_to_theater/{theaterId}")
    @PreAuthorize("hasRole('ROLE_VENDOR')")
    public ResponseResult addMovieToTheater(@PathVariable("theaterId") Integer theaterId,
                                            @RequestBody Movie movie){
        return cityService.addMovieToTheater(theaterId, movie);
    }

    @PostMapping("/update/{movieId}")
    @PreAuthorize("hasRole('ROLE_VENDOR')")
    public ResponseResult updateMovie(@PathVariable("movieId") Integer movieId,
                                      @RequestBody Movie movie){
        return cityService.updateMovie(movieId, movie);
    }

    @DeleteMapping("/remove_movie_from_theater/{movieId}")
    @PreAuthorize("hasRole('ROLE_VENDOR')")
    public ResponseResult removeMovieFromTheater(@PathVariable("movieId") Integer movieId){
        return cityService.removeMovieFromTheater(movieId);
    }


}
