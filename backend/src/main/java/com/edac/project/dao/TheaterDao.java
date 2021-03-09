package com.edac.project.dao;

import com.edac.project.models.theater.Theater;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TheaterDao extends JpaRepository<Theater, Integer> {

//    @Query("from Theater where id = :a")
//    public Theater findTheaterByTheaterId(@Param("a") Integer theaterId);


}
