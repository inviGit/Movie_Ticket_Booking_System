package com.edac.project.controllers;

import com.edac.project.models.common.ResponseResult;
import com.edac.project.models.theater.Ticket;
import com.edac.project.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ticket")
public class TicketController {

    private final CityService cityService;

    @Autowired
    public TicketController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/{ticketId}")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public Ticket getTicetById(@PathVariable("ticketId") Integer ticketId){
        return cityService.getTicketById(ticketId);
    }


}
