package com.edac.project.models.theater;

import com.edac.project.models.movie.Movie;

public class Show {

    private String showTime;

    private Movie movie;

    private Seating seating;

    public Show() {
    }

    public Show(String showTime) {
        this.showTime = showTime;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public String getShowTime() {
        return showTime;
    }

    public void setShowTime(String showTime) {
        this.showTime = showTime;
    }

    public Seating getSeating() {
        return seating;
    }

    public void setSeating(Seating seating) {
        this.seating = seating;
    }

}
