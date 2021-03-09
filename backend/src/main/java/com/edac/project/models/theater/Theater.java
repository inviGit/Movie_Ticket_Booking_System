package com.edac.project.models.theater;

import com.edac.project.models.City;
import com.edac.project.models.common.BaseEntity;
import com.edac.project.models.movie.Movie;
import com.edac.project.models.users.Vendor;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "theater")
public class Theater extends BaseEntity {

    @Column(name = "theater_name", length = 20, nullable = false)
    private String theaterName;

    @Column(name = "theater_address", length = 50, nullable = false)
    private String theaterAddress;

    @JsonIgnore
    @ManyToOne(fetch= FetchType.LAZY)
    private City city;

    @OneToMany(mappedBy="theater",
            orphanRemoval = true)
    private List<Movie> movies;

    @JsonIgnore
    @ManyToOne(fetch= FetchType.LAZY)
    private Vendor vendor;

    public Theater() {
    }

    public Theater(@NotBlank(message = "TheaterName is required") String theaterName, @NotBlank(message = "TheaterAddress is required") String theaterAddress) {
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

    public Vendor getVendor() {
        return vendor;
    }

    public void setVendor(Vendor vendor) {
        this.vendor = vendor;
    }

    public void addMovie(Movie movie) {
        movies.add(movie);
        movie.setTheater(this);
    }

    public void removeMovie(Movie movie) {
        movies.remove(movie);
        movie.setTheater(null);
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
