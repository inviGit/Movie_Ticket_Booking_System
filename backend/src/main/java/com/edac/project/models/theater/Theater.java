package com.edac.project.models.theater;

import com.edac.project.models.City;
import com.edac.project.models.movie.Movie;
import java.util.List;

public class Theater {

    private String theaterName;

    private String theaterAddress;

    private City city;

    private List<Movie> movies;

    public Theater() {
    }

    public Theater(String theaterName, String theaterAddress) {
        this.theaterName = theaterName;
        this.theaterAddress = theaterAddress;
    }

    public String getTheaterName() {
        return theaterName;
    }

    public void setTheaterName(String theaterName) {
        this.theaterName = theaterName;
    }

    public String getTheaterAddress() {
        return theaterAddress;
    }

    public void setTheaterAddress(String theaterAddress) {
        this.theaterAddress = theaterAddress;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }


    public void addMovie(Movie movie) {
        movies.add(movie);
        movie.setTheater(this);
    }

    public void removeMovie(Movie movie) {
        movies.remove(movie);
        movie.setTheater(null);
    }

}
