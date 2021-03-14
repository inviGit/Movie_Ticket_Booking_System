package com.edac.project.dao;

import com.edac.project.models.theater.Show;
import com.edac.project.models.theater.Ticket;
import com.edac.project.models.users.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketDao extends JpaRepository<Ticket, Integer> {

    @Query("from Ticket where show = :a AND customer = :b")
    public List<Ticket> findTicketByCustomerIdAndShowId(@Param("a") Show show, @Param("b") Customer customer);
}

