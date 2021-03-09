package com.edac.project.security;

public enum ApplicationUserPermission {
    MOVIE_READ("movie:read"),
    MOVIE_WRITE("movie:write"),
    CITY_READ("city:read"),
    CITY_WRITE("city:write"),
    SHOW_READ("show:read"),
    SHOW_WRITE("show:write"),
    THEATER_READ("theater:read"),
    THEATER_WRITE("theater:write");


    private final String permission;

    ApplicationUserPermission(String permission) {
        this.permission=permission;
    }

    public String getPermission() {
        return permission;
    }

}