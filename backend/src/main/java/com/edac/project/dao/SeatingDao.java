package com.edac.project.dao;

import com.edac.project.models.theater.Seating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeatingDao extends JpaRepository<Seating, Integer> {
}
