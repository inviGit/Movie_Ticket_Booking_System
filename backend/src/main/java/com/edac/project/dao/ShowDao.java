package com.edac.project.dao;

import com.edac.project.models.theater.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowDao extends JpaRepository<Show, Integer> {

}
