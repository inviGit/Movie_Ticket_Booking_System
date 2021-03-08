package com.edac.project.controllers;


import com.edac.project.models.common.ResponseResult;
import com.edac.project.models.movie.GenreList;
import com.edac.project.models.movie.LanguageList;
import com.edac.project.models.movie.Movie;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@RestController
@RequestMapping("/api/v1/movie")
public class MovieController {

    @GetMapping("/{movieId}")
    public Movie getMovie(@PathVariable("movieId") Integer movieId){
        Movie movie = new Movie(
                "Before",
                "Hlk",
                "hulky",
                LanguageList.Hindi,
                "iron mane",
                GenreList.Action,
                true);
        return movie;
    }

    @GetMapping("/all")
    public List<Movie> getAllMovies(){
        List<Movie> movies = new ArrayList<>();
        Movie movie = new Movie(
                "Before",
                "Hlk",
                "hulky",
                LanguageList.Hindi,
                "iron mane",
                GenreList.Action,
                true);
        movies.add(movie);
        return movies;
    }

    @PutMapping("/add_movie_to_theater/{theaterId}")
    public ResponseResult addMovieToTheater(@PathVariable("theaterId") Integer theaterId,
                                            @RequestBody Movie movie){
        ResponseResult responseResult = new ResponseResult(1, "success", movie);
        return responseResult;
    }

    @PostMapping("/update/{movieId}")
    public ResponseResult updateMovie(@PathVariable("movieId") Integer movieId,
                                      @RequestBody Movie movie){
        ResponseResult responseResult = new ResponseResult(1, "success", movie);
        return responseResult;
    }

    @DeleteMapping("/remove_movie_from_theater")
    public ResponseResult removeMovieFromTheater(@RequestParam("movieId") Integer movieId){
        ResponseResult responseResult = new ResponseResult(1, "success", null);
        return responseResult;
    }


}
