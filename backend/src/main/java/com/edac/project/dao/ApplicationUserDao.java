package com.edac.project.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.edac.project.models.users.ApplicationUser;
@Repository("jpa")
public interface ApplicationUserDao extends JpaRepository<ApplicationUser, String>{
}
