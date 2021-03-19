package com.edac.project.controllers;

import com.edac.project.models.common.ResponseResult;
import com.edac.project.models.theater.Seating;
import com.edac.project.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import java.util.List;

@RestController
@RequestMapping("/api/v1/seating")
public class SeatingController {

    private final CityService cityService;

    @Autowired
    public SeatingController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/{seatingId}")
    @PermitAll
    public Seating getSeatingById(@PathVariable("seatingId") Integer seatingId){
        cityService.getSeatingById(seatingId);
        return null;
    }

    @PostMapping("/book/{showId}/{customerId}")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseResult bookSeats(@PathVariable("showId") Integer showId,
                                    @PathVariable("customerId")  Integer customerId,
                                    @RequestBody List<String> seats){
        return cityService.bookSeats(showId, customerId, seats);
    }

    @PostMapping("/cancel/{showId}/{customerId}")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseResult cancelBooking(@PathVariable("showId") Integer showId,
                                        @PathVariable("customerId") Integer customerId){
        return cityService.cancelBooking(showId, customerId);
    }
}
