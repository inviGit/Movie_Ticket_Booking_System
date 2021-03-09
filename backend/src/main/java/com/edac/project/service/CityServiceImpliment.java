package com.edac.project.service;

import com.edac.project.models.*;
import com.edac.project.models.common.ResponseResult;
import com.edac.project.models.movie.GenreList;
import com.edac.project.models.movie.LanguageList;
import com.edac.project.models.theater.Theater;
import com.edac.project.models.movie.Movie;
import com.edac.project.models.theater.Show;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class CityServiceImpliment implements CityService{

    //City -- Start
    @Override
    public City getCityById(Integer cityId) {
        City city = new City("Delhi", 110006, "Delhi");
        return city;
    }

    @Override
    public List<City> getAllCities() {
        List<City> cities = new ArrayList<>();
        City city = new City("Delhi", 110006, "Delhi");
        cities.add(city);
        return cities;
    }

    @Override
    public ResponseResult addCity(City city) {
        ResponseResult responseResult = new ResponseResult(1, "success", city);
        return responseResult;
    }

    @Override
    public ResponseResult updateCity(Integer cityId, City cityToUpdate) {
        City city = new City("Delhi", 110006, "Delhi");
        ResponseResult responseResult = new ResponseResult(1, "success", city);
        return  responseResult;
    }

    @Override
    public ResponseResult removeCityById(Integer cityId) {
        ResponseResult responseResult = new ResponseResult(1, "success", null);
        return responseResult;
    }
    //City --End


    //theater --Start
    @Override
    public Theater getTheaterById(Integer theaterId) {
        Theater theater = new Theater("DD Cinema", "road");
        return theater;
    }

    @Override
    public List<Theater> getAllTheaters() {
        List<Theater> theaters = new ArrayList<>();
        Theater theater = new Theater("DD Cinema", "road");
        theaters.add(theater);
        return theaters;
    }

    @Override
    public ResponseResult addTheater(Integer cityId, Integer vendorId, Theater theater) {
        ResponseResult responseResult = new ResponseResult(1, "success", theater);
        City city = new City("Delhi", 110006, "Delhi");
        city.addTheater(theater);
        return responseResult;
    }

    @Override
    public ResponseResult updateTheater(Integer theaterId, Theater theaterToUpdate) {
        ResponseResult responseResult = new ResponseResult(1, "success", theaterToUpdate);
        return responseResult;
    }

    @Override
    public ResponseResult removeTheaterById(Integer theaterId) {
        ResponseResult responseResult = new ResponseResult(1, "success", null);
        return responseResult;
    }
    // theater --END


    //Movie --Start
    @Override
    public Movie getMovieById(Integer movieId) {
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

    @Override
    public List<Movie> getAllMovies() {
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

    @Override
    public ResponseResult addMovieToTheater(Integer theaterId, Movie movie) {
        ResponseResult responseResult = new ResponseResult(1, "success", movie);
        Theater theater = new Theater("DD Cinema", "road");
        theater.addMovie(movie);
        return responseResult;
    }

    @Override
    public ResponseResult updateMovie(Integer movieId, Movie movieToUpdate) {
        ResponseResult responseResult = new ResponseResult(1, "success", movieToUpdate);
        return responseResult;
    }

    @Override
    public ResponseResult removeMovieFromTheater(Integer movieId) {
        ResponseResult responseResult = new ResponseResult(1, "success", null);
        return responseResult;
    }
    //Movie --End


    //Show --Start
    @Override
    public Show getShowById(Integer showId) {
        Show show = new Show("11:30");
        return show;
    }

    @Override
    public ResponseResult addShowToTheater(Integer movieId, Show show) {
        Movie movie = new Movie(
                "Before",
                "Hlk",
                "hulky",
                LanguageList.Hindi,
                "iron mane",
                GenreList.Action,
                true);
        movie.addShow(show);
        ResponseResult responseResult = new ResponseResult(1, "success", show);
        return responseResult;
    }

    @Override
    public ResponseResult updateShowToTheater(Integer showId, Show showToUpdate) {
        ResponseResult responseResult = new ResponseResult(1, "success", showToUpdate);
        return responseResult;
    }

    @Override
    public ResponseResult removeShowFromTheater(Integer showId) {// remove show from movie
        ResponseResult responseResult = new ResponseResult(1, "success", null);
        return responseResult;
    }
//    Show --End


}
