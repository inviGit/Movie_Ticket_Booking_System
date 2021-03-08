package com.edac.project.models.movie;


import com.edac.project.models.theater.Theater;

public class Movie {

    private String movieName;

    private String actor;

    private String actress;

    private LanguageList language;

    private String director;

    private GenreList genre;

    private boolean activeStatus;

    private Theater theater;

    public Movie() {
    }

    public Movie(String movieName, String actor, String actress, LanguageList language, String director, GenreList genre, boolean activeStatus) {
        this.movieName = movieName;
        this.actor = actor;
        this.actress = actress;
        this.language = language;
        this.director = director;
        this.genre = genre;
        this.activeStatus = activeStatus;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public String getActor() {
        return actor;
    }

    public void setActor(String actor) {
        this.actor = actor;
    }

    public String getActress() {
        return actress;
    }

    public void setActress(String actress) {
        this.actress = actress;
    }

    public LanguageList getLanguage() {
        return language;
    }

    public void setLanguage(LanguageList language) {
        this.language = language;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public GenreList getGenre() {
        return genre;
    }

    public void setGenre(GenreList genre) {
        this.genre = genre;
    }

    public boolean isActiveStatus() {
        return activeStatus;
    }

    public void setActiveStatus(boolean activeStatus) {
        this.activeStatus = activeStatus;
    }

    public Theater getTheater() {
        return theater;
    }

    public void setTheater(Theater theater) {
        this.theater = theater;
    }



}
