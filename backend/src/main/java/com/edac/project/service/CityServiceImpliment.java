package com.edac.project.service;

import com.edac.project.dao.*;
import com.edac.project.exception.ResourceNotFoundException;
import com.edac.project.models.*;
import com.edac.project.models.common.ResponseResult;
import com.edac.project.models.common.SeatMapping;
import com.edac.project.models.theater.Seating;
import com.edac.project.models.theater.Theater;
import com.edac.project.models.movie.Movie;
import com.edac.project.models.theater.Show;
import com.edac.project.models.theater.Ticket;
import com.edac.project.models.users.ApplicationUser;
import com.edac.project.models.users.Customer;
import com.edac.project.models.users.Vendor;
import com.edac.project.security.ApplicationUserRole;
import com.edac.project.security.PasswordConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CityServiceImpliment implements CityService{

    private final CityDao cityDao;
    private final TheaterDao theaterDao;
    private final MovieDao movieDao;
    private final ShowDao showDao;
    private final VendorDao vendorDao;
    private final ApplicationUserDao applicationUserDao;
    private final CustomerDao customerDao;
    private final SeatingDao seatingDao;
    private final TicketDao ticketDao;
    private ResponseResult responseResult;


    @Autowired
    public CityServiceImpliment(CityDao cityDao,
                                TheaterDao theaterDao,
                                MovieDao movieDao,
                                ShowDao showDao,
                                VendorDao vendorDao,
                                ApplicationUserDao applicationUserDao,
                                CustomerDao customerDao,
                                SeatingDao seatingDao,
                                TicketDao ticketDao) {
        this.cityDao = cityDao;
        this.theaterDao = theaterDao;
        this.movieDao = movieDao;
        this.showDao = showDao;
        this.vendorDao = vendorDao;
        this.applicationUserDao = applicationUserDao;
        this.customerDao = customerDao;
        this.seatingDao = seatingDao;
        this.ticketDao = ticketDao;
    }

    //Vendor --Start
    @Override
    public Vendor getVendorById(Integer vendorId) {
        Vendor vendor;
        try {
            vendor = vendorDao.findById(vendorId).get();
        } catch (Exception e) {
            System.out.println(e.getClass().getName());
            return null;
        }
        return vendor;
    }

    @Override
    public Vendor getVendorByUserName(String username) {
        ApplicationUser applicationUser;
        try {
            applicationUser = applicationUserDao.findById(username).get();
        } catch (Exception e) {
            applicationUser=null;
        }
        if(applicationUser!=null){
            return vendorDao.findVendorByApplicationUser(applicationUser);
        }else{
            return null;
        }
    }

    @Override
    public List<Vendor> getAllVendors() {
        return vendorDao.findAll();
    }

    @Override
    public ResponseResult addVendor(Vendor vendor) {
        responseResult = new ResponseResult(0, "User Error", null);
        try {
            vendor = vendorDao.save(vendor);
            responseResult.setStatus(1);
            responseResult.setMessage("Vendor Added Successfully");
            responseResult.setObject(vendor);
        } catch (Exception e) {
            responseResult.setMessage("Duplicate entry "+ vendor.getVendorEmail() +" for vendor");
            e.printStackTrace();
        }
        return responseResult;
    }

    @Override
    public ResponseResult registerVendor(Integer vendorId, ApplicationUser applicationUser) {
        responseResult = new ResponseResult(0, "User Error", null);
        Vendor vendor = getVendorById(vendorId);
        Optional<ApplicationUser> byId = applicationUserDao.findById(applicationUser.getUsername());
        if(byId.isPresent()){
            responseResult.setMessage("Already registered");
        }else if(vendor == null ){
            responseResult.setMessage("Vendor doesn't exist");
        }else{
            applicationUser.setRole(ApplicationUserRole.VENDOR);
            PasswordConfig passwordConfig = new PasswordConfig();
            applicationUser.setPassword(passwordConfig.passwordEncoder().encode(applicationUser.getPassword()));
            try {
                applicationUserDao.save(applicationUser);
                vendor.setApplicationUser(applicationUser);
                vendorDao.save(vendor);
                responseResult.setStatus(1);
                responseResult.setMessage("Vendor Registered Successfully");
                responseResult.setObject("username: "+ applicationUser.getUsername());
            } catch (Exception e) {
                responseResult.setMessage("Duplicate entry " + applicationUser.getUsername() + " for user");
                e.printStackTrace();
            }
        }
        return responseResult;
    }

    @Override
    public ResponseResult updateVendor(Integer vendorId, Vendor vendorToUpdate) {
        responseResult = new ResponseResult(0, "User Error", null);
        Vendor vendor = getVendorById(vendorId);
        if(vendor==null){
            responseResult.setMessage("vendor doesn't exist");
        }else{
            try {
                vendorToUpdate.setId(vendor.getId());
                vendorToUpdate.setTheaters(vendor.getTheaters());
                vendorToUpdate.setApplicationUser(vendor.getApplicationUser());
                vendorDao.save(vendorToUpdate);
                responseResult.setStatus(1);
                responseResult.setMessage("Vendor updated successfully");
            } catch (Exception e) {
                responseResult.setMessage("Duplicate entry "+ vendor.getVendorEmail() +" for vendor");
                e.printStackTrace();
            }
        }
        responseResult.setObject(vendorToUpdate);
        return responseResult;
    }

    @Override
    public ResponseResult removeVendorById(Integer vendorId) {
        responseResult = new ResponseResult(0, "User Error", null);
        try {
            vendorDao.deleteById(vendorId);
            responseResult.setStatus(1);
            responseResult.setMessage("Vendor removed successfully");
        } catch (Exception e) {
            responseResult.setMessage("Vendor doesn't exist");
            e.printStackTrace();
        }
        return responseResult;
    }
    //Vendor --End


    //Customer --Start
    @Override
    public Customer getCustomerById(Integer customerId) {
        Customer customer;
        try {
            customer = customerDao.findById(customerId).get();
        } catch (Exception e) {
            return null;
        }
        return customer;
    }

    @Override
    public Customer getCustomerByUserName(String username) {
        ApplicationUser applicationUser;
        try {
            applicationUser = applicationUserDao.findById(username).get();
        } catch (Exception e) {
            applicationUser=null;
        }
        if(applicationUser!=null){
            Customer customer = customerDao.findCustomerByApplicationUser(applicationUser);
            return customer;
        }else{
            return null;
        }
    }

    @Override
    public List<Customer> getAllCustomers() {
        return  customerDao.findAll();
    }

    @Override
    public ResponseResult registerCustomer(ApplicationUser applicationUser, Customer customer) {
        responseResult = new ResponseResult(0, "User Error", null);
        if(!applicationUserDao.existsById(applicationUser.getUsername())){
            applicationUser.setRole(ApplicationUserRole.CUSTOMER);
            PasswordConfig passwordConfig = new PasswordConfig();
            applicationUser
                    .setPassword(passwordConfig.passwordEncoder()
                            .encode(applicationUser.getPassword()));
            customer.setApplicationUser(applicationUser);
            try {
                customerDao.save(customer);
                applicationUserDao.save(applicationUser);
                responseResult.setStatus(1);
                responseResult.setMessage("Customer Registered Successfully");
                responseResult.setObject(applicationUser.getUsername());
            } catch (Exception e) {
                e.printStackTrace();
                responseResult.setMessage("ERROR: "+e.getMessage());
            }
        }else{
            responseResult.setMessage("Duplicate UserName");
        }
        return responseResult;
    }

    @Override
    public ResponseResult updateCustomer(Integer customerId, Customer customerToUpdate) {
        responseResult = new ResponseResult(0, "User Error", null);
        Customer customer = getCustomerById(customerId);
        if(customer==null){
            responseResult.setMessage("Customer Not Registered");
        }else{
            try {
                customerToUpdate.setId(customer.getId());
                customerToUpdate.setApplicationUser(customer.getApplicationUser());
                customerToUpdate.setTickets(customer.getTickets());
                customerDao.save(customerToUpdate);
                responseResult.setStatus(1);
                responseResult.setMessage("Customer details updated successfully");
            } catch (Exception e) {
                responseResult.setMessage("Duplicate entry "+ customer.getEmail() +" for customer");
                e.printStackTrace();
            }
        }
        responseResult.setObject(customerToUpdate);
        return responseResult;
    }

    @Override
    public ResponseResult removeCustomerById(Integer customerId) {
        responseResult = new ResponseResult(0, "User Error", null);
        if(customerDao.existsById(customerId)){
            try {
                customerDao.deleteById(customerId);
                responseResult.setStatus(1);
                responseResult.setMessage("Removed Customer "+customerId+" Successfully");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }else{
            responseResult.setMessage("Customer doesn't exist");
        }
        return responseResult;
    }
    //Customer --End


    //City -- Start
    @Override
    public City getCityById(Integer cityId) {
        City city;
        try {
            city = cityDao.findById(cityId).get();
        } catch (Exception e) {
            return null;
        }
        return city;
    }

    @Override
    public List<City> getAllCities() {
        return cityDao.findAll();
    }

    @Override
    public ResponseResult addCity(City city) {
        responseResult = new ResponseResult(0, "User Error", null);
        try {
            city = cityDao.save(city);
            responseResult.setStatus(1);
            responseResult.setMessage("City added Successfully");
        } catch (Exception e) {
            responseResult.setMessage("Duplicate pincode entry "+ city.getPincode() +" for city");
            e.printStackTrace();
        }
        responseResult.setObject(city);
        return responseResult;
    }

    @Override
    public ResponseResult updateCity(Integer cityId, City cityToUpdate) {
        responseResult = new ResponseResult(0, "User Error", null);
        City city = getCityById(cityId);
        if(city==null){
            responseResult.setMessage("City doesn't exist");
        }else{
            try {
                cityToUpdate.setPincode(city.getPincode());
                cityToUpdate.setTheaters(city.getTheaters());
                cityDao.save(cityToUpdate);
                responseResult.setStatus(1);
                responseResult.setMessage("Updated City Successfully");
            } catch (Exception e) {
                responseResult.setMessage("Duplicate pincode entry "+ city.getPincode() +" for city");
                e.printStackTrace();
            }
        }
        responseResult.setObject(cityToUpdate);
        return responseResult;
    }

    @Override
    public ResponseResult removeCityById(Integer cityId) {
        responseResult = new ResponseResult(0, "User Error", null);
        if(cityDao.existsById(cityId)){
            try {
                cityDao.deleteById(cityId);
                responseResult.setStatus(1);
                responseResult.setMessage("Removed City "+cityId+" Successfully");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }else{
            responseResult.setMessage("City doesn't exist");
        }
        return responseResult;
    }
    //City --End


    //theater --Start
    @Override
    public Theater getTheaterById(Integer theaterId) {
        Theater theater;
        try {
            theater = theaterDao.findById(theaterId).get();
            return theater;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<Theater> getAllTheaters() {
        return theaterDao.findAll();
    }

    @Override
    public ResponseResult addTheater(Integer cityId, Integer vendorId, Theater theater) {
        responseResult = new ResponseResult(0, "User Error", null);
        City city = getCityById(cityId);
        Vendor vendor = getVendorById(vendorId);
        if(city==null){
            responseResult.setMessage("City Doesn't exist");
        }else if(vendor==null){
            responseResult.setMessage("Vendor Doesn't exist");
        }else if(city.getTheaters().stream().filter(t -> t.getTheaterName().equals(theater.getTheaterName())&&
                t.getTheaterAddress().equals(theater.getTheaterAddress())).count()>0){
            responseResult.setMessage("Duplicate entry "+theater.getTheaterName()+" for theater");
        }else {
            try {
                city.addTheater(theater);
                vendor.addTheater(theater);
                theaterDao.save(theater);
                responseResult.setStatus(1);
                responseResult.setMessage("Theater added successfully");
                responseResult.setObject(theater);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return responseResult;
    }

    @Override
    public ResponseResult updateTheater(Integer theaterId, Theater theaterToUpdate) {
        responseResult = new ResponseResult(0, "User Error", null);
        Theater theater = getTheaterById(theaterId);
        if(theater==null){
            responseResult.setMessage("Theater doesn't exist");
        }else{
            theaterToUpdate.setId(theater.getId());
            theaterToUpdate.setCity(theater.getCity());
            theaterToUpdate.setMovies(theater.getMovies());
            theaterToUpdate.setVendor(theater.getVendor());
            try {
                theaterDao.save(theaterToUpdate);
                responseResult.setStatus(1);
                responseResult.setMessage("Theater updated successfully");
            } catch (Exception e) {
                responseResult.setMessage("Duplicate entry "+theaterToUpdate.getTheaterAddress()+" for theater");
                e.printStackTrace();
            }
        }
        responseResult.setObject(theaterToUpdate);
        return responseResult;
    }

    @Override
    public ResponseResult removeTheaterById(Integer theaterId) {
        responseResult = new ResponseResult(0, "User Error", null);
        try {
            theaterDao.deleteById(theaterId);
            responseResult.setStatus(1);
            responseResult.setMessage("Removed theater successfully");
        } catch (Exception e) {
            responseResult.setMessage("Theater Doesn't exist");
            e.printStackTrace();
        }
        return responseResult;
    }
    // theater --END


    //Movie --Start
    @Override
    public Movie getMovieById(Integer movieId) {
        Movie movie;
        try {
            movie = movieDao.findById(movieId).get();
        } catch (Exception e) {
            return null;
        }
        return movie;
    }

    @Override
    public List<Movie> getAllMovies() {
        return movieDao.findAll();
    }

    @Override
    public ResponseResult addMovieToTheater(Integer theaterId, Movie movie) {
        responseResult = new ResponseResult(0, "User Error", null);
        Theater theater = getTheaterById(theaterId);
        if(theater==null){
            responseResult.setMessage("theater Doesn't exist");
        }else{
            if(theater.getMovies().stream().filter(t->
                    t.getMovieName().equals(movie.getMovieName()) &&
                            t.getLanguage().equals(movie.getLanguage())).count()>0){
                responseResult.setMessage("Duplicate Movie entry for theater");
            }else{
                try {
                    movieDao.save(movie);
                    theater.addMovie(movie);
                    theaterDao.save(theater);
                    responseResult.setStatus(1);
                    responseResult.setMessage("Added movie to theater successfully");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            responseResult.setObject(movie);
        }
        return responseResult;
    }

    @Override
    public ResponseResult updateMovie(Integer movieId, Movie movieToUpdate) {
        responseResult = new ResponseResult(0, "User Error", null);
        Movie movie = getMovieById(movieId);
        if(movie == null){
            responseResult.setMessage("Movie doesn't exist");
        }else{
            movieToUpdate.setId(movie.getId());
            movieToUpdate.setTheater(movie.getTheater());
            movieToUpdate.setShows(movie.getShows());
            try {
                movieDao.save(movieToUpdate);
                responseResult.setStatus(1);
                responseResult.setMessage("Movie updated successfully");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        responseResult.setObject(movieToUpdate);
        return responseResult;
    }

    @Override
    public ResponseResult removeMovieFromTheater(Integer movieId) {
        responseResult = new ResponseResult(0, "User Error", null);
        try {
            movieDao.deleteById(movieId);
            responseResult.setMessage("Movie removed from theater successfully");
            responseResult.setStatus(1);

        } catch (Exception e) {
            responseResult.setMessage("Movie Doesn't exist");
            e.printStackTrace();
        }
        return responseResult;
    }
    //Movie --End


    // Show --Start
    @Override
    public Show getShowById(Integer showId) {
        Show show;
        try {
            show = showDao.findById(showId).get();
        } catch (Exception e) {
            return null;
        }
        return show;
    }

    @Override
    public ResponseResult addShowToTheater(Integer movieId, Show show) {
        responseResult = new ResponseResult(0, "User Error", null);
        Movie movie = getMovieById(movieId);
        if(movie==null){
            responseResult.setMessage("movie Doesn't exist");
        }else if(movie.getShows().stream().filter(s -> s.getShowTime().equals(show.getShowTime())).count()>0) {
            responseResult.setMessage("Duplicate show entry for movie");
        }else {
            try {
                Seating seating = new Seating();
                short[][] seats = new short[7][9];
                seating.setSeats(seats);
                movie.addShow(show);
                show.setSeating(seating);
                showDao.save(show);
                seatingDao.save(seating);
                responseResult.setMessage("Show added Successfully");
                responseResult.setStatus(1);
                responseResult.setObject(show);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return responseResult;
    }

    @Override
    public ResponseResult updateShowToTheater(Integer showId, Show showToUpdate) {
        responseResult = new ResponseResult(0, "User Error", null);
        Show show = getShowById(showId);
        if(show == null){
            responseResult.setMessage("Show doesn't exist");
        }else{
            showToUpdate.setId(show.getId());
            showToUpdate.setMovie(show.getMovie());
            try {
                showDao.save(showToUpdate);
                responseResult.setStatus(1);
                responseResult.setMessage("Updated Show Successfully");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        responseResult.setObject(showToUpdate);
        return responseResult;
    }

    @Override
    public ResponseResult removeShowFromTheater(Integer showId) {
        responseResult = new ResponseResult(0, "User Error", null);
        try {
            showDao.deleteById(showId);
            responseResult.setMessage("Removed Show Successfully");
            responseResult.setStatus(1);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return responseResult;
    }
    // Show --End


    //Seating --Start
    @Override
    public Seating getSeatingById(Integer seatingId) {
        Seating seating;
        try {
            seating = seatingDao.findById(seatingId).get();
            return seating;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
        public ResponseResult bookSeats(Integer showId, Integer customerId, List<String> seats) {
        responseResult = new ResponseResult(0, "User Error", null);
        Show show = getShowById(showId);
        Customer customer = getCustomerById(customerId);
        Seating seating = show.getSeating();
        if (seating == null) {
            responseResult.setMessage("Show is not available");
        }else if(customer == null){
            responseResult.setMessage("Invalid Customer: "+customerId);
        }else{
            List<Ticket> tickets = new ArrayList<>();
            Ticket ticket;
            Map<Character,Integer> seatMap = new SeatMapping().getSeatMap();
            short[][] seatsToUpdate = seating.getSeats();
            for(String seat: seats){
                Character a = seat.charAt(0);
                int rowIndex = seatMap.get(seat.charAt(0));
                int columnIndex = Integer.parseInt(String.valueOf(seat.charAt(1)));
                if(seatsToUpdate[rowIndex][columnIndex-1]==1){
                    responseResult.setMessage("Seat: " + seat + " is already booked");
                    return responseResult;
                }else{
                    seatsToUpdate[rowIndex][columnIndex-1]=1;
                    ticket = new Ticket();
                    ticket.setSeatNo(seat);
                    show.addTicket(ticket);
                    customer.addTicket(ticket);
                    tickets.add(ticket);
                }
            }
            try {
                List<Ticket> savedTickets = ticketDao.saveAll(tickets);
                responseResult.setStatus(1);
                responseResult.setMessage("Booked show successfully");
                responseResult.setObject(savedTickets);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return responseResult;
    }

    @Override
    public ResponseResult cancelBooking(Integer showId, Integer customerId) {
        responseResult = new ResponseResult(0, "User Error", null);
        Show show = getShowById(showId);
        Customer customer = getCustomerById(customerId);
        if(show==null){
            responseResult.setMessage("Invalid ShowId: " + showId);
        }else if(customer==null){
            responseResult.setMessage("Invalid customerId: " + customerId);
        }else{
            List<Ticket> tickets = ticketDao.findTicketByCustomerIdAndShowId(show, customer);
            Map<Character,Integer> seatMap = new SeatMapping().getSeatMap();
            Seating seating = show.getSeating();
            short[][] seatsToUpdate = seating.getSeats();
            for(Ticket ticket: tickets){
                String seat = ticket.getSeatNo();
                Character a = seat.charAt(0);
                int rowIndex = seatMap.get(seat.charAt(0));
                int columnIndex = Integer.parseInt(String.valueOf(seat.charAt(1)));
                seatsToUpdate[rowIndex][columnIndex-1]=0;
            }
            try {
                ticketDao.deleteAll(tickets);
                responseResult.setStatus(1);
                responseResult.setMessage("Cancelled booking successfully");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return responseResult;
    }

    // Ticket --START
    @Override
    public Ticket getTicketById(Integer ticketId) {
        Ticket ticket;
        try {
            ticket = ticketDao.findById(ticketId).get();
            return ticket;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
