package com.edac.project.models.theater;

import com.edac.project.models.common.BaseEntity;
import com.edac.project.models.movie.Movie;
import com.edac.project.models.users.ApplicationUser;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "show_details")
public class Show extends BaseEntity {

    @Column(name = "show_time", length = 10, nullable = false)
    private String showTime;

    @Column(name = "show_date", length = 10, nullable = false)
    private String showDate;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Movie movie;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "seating", referencedColumnName = "id")
    private Seating seating;

    @JsonIgnore
    @OneToMany(mappedBy="show",
            orphanRemoval = true)
    private List<Ticket> tickets;

    public Show() {
    }

    public Show(String showTime, String showDate) {
        this.showTime = showTime;
        this.showDate = showDate;
    }

    public String getShowDate() {
        return showDate;
    }

    public void setShowDate(String showDate) {
        this.showDate = showDate;
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

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public void addTicket(Ticket ticket) {
        tickets.add(ticket);
        ticket.setShow(this);
    }

    public void removeTicket(Ticket ticket) {
        tickets.remove(ticket);
        ticket.setShow(null);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Show )) return false;
        return getId() != null && getId().equals(((Show) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
