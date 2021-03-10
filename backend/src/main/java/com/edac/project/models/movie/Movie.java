package com.edac.project.models.movie;

import com.edac.project.models.common.BaseEntity;
import com.edac.project.models.theater.Show;
import com.edac.project.models.theater.Theater;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "movie")
public class Movie extends BaseEntity {

    @Column(name = "movie_name", length = 20)
    @NotBlank(message = "MovieName is required")
    private String movieName;

    @NotBlank(message="Movie actor name should be Mandatory")
    @Column(name="actor", length=25,nullable=false)
    private String actor;

    @NotBlank(message="Movie actress name should be Mandatory")
    @Column(name="actress", length=25,nullable=false)
    private String actress;

    @Enumerated(EnumType.STRING)
    @Column(name="language", length=25,nullable=false)
    private LanguageList language;

    @NotBlank(message="Movie director name should be Mandatory")
    @Column(name="director", length=25,nullable=false)
    private String director;

    @Column(name="genre", length=25,nullable=false)
    @Enumerated(EnumType.STRING)
    private GenreList genre;

    @Column(name="active_status", nullable=false)
    private boolean activeStatus;

    @JsonIgnore
    @ManyToOne(fetch= FetchType.LAZY)
    private Theater theater;

    @OneToMany(mappedBy = "movie",
            orphanRemoval = true)
    public List<Show> shows;

    public Movie() {
    }

    public Movie(@NotBlank(message = "MovieName is required") String movieName,
                 @NotBlank(message = "Movie actor name should be Mandatory") String actor,
                 @NotBlank(message = "Movie actress name should be Mandatory") String actress,
                 LanguageList language,
                 @NotBlank(message = "Movie director name should be Mandatory") String director,
                 GenreList genre,
                 boolean activeStatus) {
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

    public List<Show> getShows() {
        return shows;
    }

    public void setShows(List<Show> shows) {
        this.shows = shows;
    }

    public Theater getTheater() {
        return theater;
    }

    public void setTheater(Theater theater) {
        this.theater = theater;
    }

    public void addShow(Show show) {
        shows.add(show);
        show.setMovie(this);
    }

    public void removeShow(Show show) {
        shows.remove(show);
        show.setMovie(null);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Theater )) return false;
        return getId() != null && getId().equals(((Theater) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
