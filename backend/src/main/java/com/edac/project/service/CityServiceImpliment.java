package com.edac.project.service;

import com.edac.project.dao.*;
import com.edac.project.models.*;
import com.edac.project.models.common.ResponseResult;
import com.edac.project.models.theater.Seating;
import com.edac.project.models.theater.Theater;
import com.edac.project.models.movie.Movie;
import com.edac.project.models.theater.Show;
import com.edac.project.models.users.ApplicationUser;
import com.edac.project.models.users.Customer;
import com.edac.project.models.users.Vendor;
import com.edac.project.security.ApplicationUserRole;
import com.edac.project.security.PasswordConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
    private static final ResponseResult RESPONSE = new ResponseResult(0, "User Error", null);

    @Autowired
    public CityServiceImpliment(CityDao cityDao,
                                TheaterDao theaterDao,
                                MovieDao movieDao,
                                ShowDao showDao,
                                VendorDao vendorDao,
                                ApplicationUserDao applicationUserDao,
                                CustomerDao customerDao, SeatingDao seatingDao) {
        this.cityDao = cityDao;
        this.theaterDao = theaterDao;
        this.movieDao = movieDao;
        this.showDao = showDao;
        this.vendorDao = vendorDao;
        this.applicationUserDao = applicationUserDao;
        this.customerDao = customerDao;
        this.seatingDao = seatingDao;
    }

    //Vendor --Start
    @Override
    public Vendor getVendorById(Integer vendorId) {
        Vendor vendor;
        try {
            vendor = vendorDao.findById(vendorId).get();
        } catch (Exception e) {
            return null;
        }
        return vendor;
    }

    @Override
    public List<Vendor> getAllVendors() {
        return vendorDao.findAll();
    }

    @Override
    public ResponseResult addVendor(Vendor vendor) {
        try {
            vendor = vendorDao.save(vendor);
            RESPONSE.setStatus(1);
            RESPONSE.setMessage("Vendor Added Successfully");
            RESPONSE.setObject(vendor);
        } catch (Exception e) {
            RESPONSE.setMessage("Duplicate entry "+ vendor.getVendorEmail() +" for vendor");
            e.printStackTrace();
        }
        return RESPONSE;
    }

    @Override
    public ResponseResult registerVendor(Integer vendorId, ApplicationUser applicationUser) {
        Vendor vendor = getVendorById(vendorId);
        Optional<ApplicationUser> byId = applicationUserDao.findById(applicationUser.getUsername());
        if(byId.isPresent()){
            RESPONSE.setMessage("Already registered");
        }else if(vendor == null ){
            RESPONSE.setMessage("Vendor doesn't exist");
        }else{
            applicationUser.setRole(ApplicationUserRole.VENDOR);
            PasswordConfig passwordConfig = new PasswordConfig();
            applicationUser.setPassword(passwordConfig.passwordEncoder().encode(applicationUser.getPassword()));
            try {
                applicationUserDao.save(applicationUser);
                vendor.setApplicationUser(applicationUser);
                vendorDao.save(vendor);
                RESPONSE.setStatus(1);
                RESPONSE.setMessage("Vendor Registered Successfully");
                RESPONSE.setObject("username: "+ applicationUser.getUsername());
            } catch (Exception e) {
                RESPONSE.setMessage("Duplicate entry " + applicationUser.getUsername() + " for user");
                e.printStackTrace();
            }
        }
        return RESPONSE;
    }

    @Override
    public ResponseResult updateVendor(Integer vendorId, Vendor vendorToUpdate) {
        Vendor vendor = getVendorById(vendorId);
        if(vendor==null){
            RESPONSE.setMessage("vendor doesn't exist");
        }else{
            try {
                vendorToUpdate.setId(vendor.getId());
                vendorToUpdate.setTheaters(vendor.getTheaters());
                vendorToUpdate.setApplicationUser(vendor.getApplicationUser());
                vendorDao.save(vendorToUpdate);
                RESPONSE.setStatus(1);
                RESPONSE.setMessage("Vendor updated successfully");
            } catch (Exception e) {
                RESPONSE.setMessage("Duplicate entry "+ vendor.getVendorEmail() +" for vendor");
                e.printStackTrace();
            }
        }
        RESPONSE.setObject(vendorToUpdate);
        return RESPONSE;
    }

    @Override
    public ResponseResult removeVendorById(Integer vendorId) {
        try {
            vendorDao.deleteById(vendorId);
            RESPONSE.setStatus(1);
            RESPONSE.setMessage("Vendor removed successfully");
        } catch (Exception e) {
            RESPONSE.setMessage("Vendor doesn't exist");
            e.printStackTrace();
        }
        return RESPONSE;
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
    public List<Customer> getAllCustomers() {
        return  customerDao.findAll();
    }

    @Override
    public ResponseResult registerCustomer(ApplicationUser applicationUser,
                                           Customer customer) {
        if(!applicationUserDao.existsById(applicationUser.getUsername())){
            applicationUser.setRole(ApplicationUserRole.CUSTOMER);
            PasswordConfig passwordConfig = new PasswordConfig();
            applicationUser
                    .setPassword(passwordConfig.passwordEncoder()
                            .encode(applicationUser.getPassword()));
            customer.setApplicationUser(applicationUser);
            try {
                applicationUserDao.save(applicationUser);
                customerDao.save(customer);
                RESPONSE.setStatus(1);
                RESPONSE.setMessage("Customer Registered Successfully");
                RESPONSE.setObject(applicationUser.getUsername());
            } catch (Exception e) {
                e.printStackTrace();
                RESPONSE.setMessage("ERROR: "+e.getMessage());
            }
        }else{
            RESPONSE.setMessage("Duplicate UserName");
        }
        return RESPONSE;
    }

    @Override
    public ResponseResult updateCustomer(Integer customerId, Customer customerToUpdate) {
        Customer customer = getCustomerById(customerId);
        if(customer==null){
            RESPONSE.setMessage("Customer Not Registered");
        }else{
            try {
                customerToUpdate.setId(customer.getId());
                customerToUpdate.setApplicationUser(customer.getApplicationUser());
                customerDao.save(customerToUpdate);
                RESPONSE.setStatus(1);
                RESPONSE.setMessage("Customer details updated successfully");
            } catch (Exception e) {
                RESPONSE.setMessage("Duplicate entry "+ customer.getEmail() +" for customer");
                e.printStackTrace();
            }
        }
        RESPONSE.setObject(customerToUpdate);
        return RESPONSE;
    }

    @Override
    public ResponseResult removeCustomerById(Integer customerId) {
        if(customerDao.existsById(customerId)){
            try {
                customerDao.deleteById(customerId);
                RESPONSE.setStatus(1);
                RESPONSE.setMessage("Removed Customer "+customerId+" Successfully");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }else{
            RESPONSE.setMessage("Customer doesn't exist");
        }
        return RESPONSE;
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
        try {
            city = cityDao.save(city);
            RESPONSE.setStatus(1);
            RESPONSE.setMessage("City added Successfully");
        } catch (Exception e) {
            RESPONSE.setMessage("Duplicate pincode entry "+ city.getPincode() +" for city");
            e.printStackTrace();
        }
        RESPONSE.setObject(city);
        return RESPONSE;
    }

    @Override
    public ResponseResult updateCity(Integer cityId, City cityToUpdate) {
        City city = getCityById(cityId);
        if(city==null){
            RESPONSE.setMessage("City doesn't exist");
        }else{
            try {
                cityToUpdate.setPincode(city.getPincode());
                cityToUpdate.setTheaters(city.getTheaters());
                cityDao.save(cityToUpdate);
                RESPONSE.setStatus(1);
                RESPONSE.setMessage("Updated City Successfully");
            } catch (Exception e) {
                RESPONSE.setMessage("Duplicate pincode entry "+ city.getPincode() +" for city");
                e.printStackTrace();
            }
        }
        RESPONSE.setObject(cityToUpdate);
        return RESPONSE;
    }

    @Override
    public ResponseResult removeCityById(Integer cityId) {
        if(cityDao.existsById(cityId)){
            try {
                cityDao.deleteById(cityId);
                RESPONSE.setStatus(1);
                RESPONSE.setMessage("Removed City "+cityId+" Successfully");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }else{
            RESPONSE.setMessage("City doesn't exist");
        }
        return RESPONSE;
    }
    //City --End


    //theater --Start
    @Override
    public Theater getTheaterById(Integer theaterId) {
        Theater theater;
        try {
            theater = theaterDao.findById(theaterId).get();
        } catch (Exception e) {
            return null;
        }
        return theater;
    }

    @Override
    public List<Theater> getAllTheaters() {
        return theaterDao.findAll();
    }

    @Override
    public ResponseResult addTheater(Integer cityId, Integer vendorId, Theater theater) {
        City city = getCityById(cityId);
        Vendor vendor = getVendorById(vendorId);
        if(city==null){
            RESPONSE.setMessage("City Doesn't exist");
        }else if(vendor==null){
            RESPONSE.setMessage("Vendor Doesn't exist");
        }else if(city.getTheaters().stream().filter(t -> t.getTheaterName().equals(theater.getTheaterName())&&
                t.getTheaterAddress().equals(theater.getTheaterAddress())).count()>0){
            RESPONSE.setMessage("Duplicate entry "+theater.getTheaterName()+" for theater");
        }else {
            try {
                theaterDao.save(theater);
                city.addTheater(theater);
                vendor.addTheater(theater);
                cityDao.save(city);
                vendorDao.save(vendor);
                RESPONSE.setStatus(1);
                RESPONSE.setMessage("Theater added successfully");
                RESPONSE.setObject(theater);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return RESPONSE;
    }

    @Override
    public ResponseResult updateTheater(Integer theaterId, Theater theaterToUpdate) {
        Theater theater = getTheaterById(theaterId);
        if(theater==null){
            RESPONSE.setMessage("Theater doesn't exist");
        }else{
            theaterToUpdate.setId(theater.getId());
            theaterToUpdate.setCity(theater.getCity());
            theaterToUpdate.setMovies(theater.getMovies());
            theaterToUpdate.setVendor(theater.getVendor());
            try {
                theaterDao.save(theaterToUpdate);
                RESPONSE.setStatus(1);
                RESPONSE.setMessage("Theater updated successfully");
            } catch (Exception e) {
                RESPONSE.setMessage("Duplicate entry "+theaterToUpdate.getTheaterAddress()+" for theater");
                e.printStackTrace();
            }
        }
        RESPONSE.setObject(theaterToUpdate);
        return RESPONSE;
    }

    @Override
    public ResponseResult removeTheaterById(Integer theaterId) {
        try {
            theaterDao.deleteById(theaterId);
            RESPONSE.setStatus(1);
            RESPONSE.setMessage("Removed theater successfully");
        } catch (Exception e) {
            RESPONSE.setMessage("Theater Doesn't exist");
            e.printStackTrace();
        }
        return RESPONSE;
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
        Theater theater = getTheaterById(theaterId);
        if(theater==null){
            RESPONSE.setMessage("theater Doesn't exist");
        }else{
            if(theater.getMovies().stream().filter(t->
                    t.getMovieName().equals(movie.getMovieName()) &&
                            t.getLanguage().equals(movie.getLanguage())).count()>0){
                RESPONSE.setMessage("Duplicate Movie entry for theater");
            }else{
                try {
                    movieDao.save(movie);
                    theater.addMovie(movie);
                    theaterDao.save(theater);
                    RESPONSE.setStatus(1);
                    RESPONSE.setMessage("Added movie to theater successfully");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            RESPONSE.setObject(movie);
        }
        return RESPONSE;
    }

    @Override
    public ResponseResult updateMovie(Integer movieId, Movie movieToUpdate) {
        Movie movie = getMovieById(movieId);
        if(movie == null){
            RESPONSE.setMessage("Movie doesn't exist");
        }else{
            movieToUpdate.setId(movie.getId());
            movieToUpdate.setTheater(movie.getTheater());
            movieToUpdate.setShows(movie.getShows());
            try {
                movieDao.save(movieToUpdate);
                RESPONSE.setStatus(1);
                RESPONSE.setMessage("Movie updated successfully");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        RESPONSE.setObject(movieToUpdate);
        return RESPONSE;
    }

    @Override
    public ResponseResult removeMovieFromTheater(Integer movieId) {
        try {
            movieDao.deleteById(movieId);
            RESPONSE.setMessage("Movie removed from theater successfully");
            RESPONSE.setStatus(1);

        } catch (Exception e) {
            RESPONSE.setMessage("Movie Doesn't exist");
            e.printStackTrace();
        }
        return RESPONSE;
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
        Movie movie = getMovieById(movieId);
        if(movie==null){
            RESPONSE.setMessage("movie Doesn't exist");
        }else if(movie.getShows().stream().filter(s -> s.getShowTime().equals(show.getShowTime())).count()>0) {
            RESPONSE.setMessage("Duplicate show entry for movie");
        }else {
            try {
                Seating seating = new Seating();
                short[][] seats = new short[7][9];
                seating.setSeats(seats);
                movie.addShow(show);
                show.setSeating(seating);
                showDao.save(show);
                seatingDao.save(seating);
                RESPONSE.setMessage("Show added Successfully");
                RESPONSE.setStatus(1);
                RESPONSE.setObject(show);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return RESPONSE;
    }

    @Override
    public ResponseResult updateShowToTheater(Integer showId, Show showToUpdate) {
        Show show = getShowById(showId);
        if(show == null){
            RESPONSE.setMessage("Show doesn't exist");
        }else{
            showToUpdate.setId(show.getId());
            showToUpdate.setMovie(show.getMovie());
            try {
                showDao.save(showToUpdate);
                RESPONSE.setStatus(1);
                RESPONSE.setMessage("Updated Show Successfully");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        RESPONSE.setObject(showToUpdate);
        return RESPONSE;
    }

    @Override
    public ResponseResult removeShowFromTheater(Integer showId) {// remove show from movie
        try {
            showDao.deleteById(showId);
            RESPONSE.setMessage("Removed Show Successfully");
            RESPONSE.setStatus(1);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return RESPONSE;
    }
    // Show --End

}
