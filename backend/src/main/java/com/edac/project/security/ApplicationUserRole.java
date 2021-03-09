package com.edac.project.security;

import com.google.common.collect.Sets;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static com.edac.project.security.ApplicationUserPermission.*;

public enum ApplicationUserRole {
    CUSTOMER(Sets.newHashSet(MOVIE_READ, CITY_READ, SHOW_READ, THEATER_READ)),
    ADMIN(Sets.newHashSet(MOVIE_READ, MOVIE_WRITE, CITY_READ, CITY_WRITE, SHOW_READ, THEATER_READ, THEATER_WRITE)),
    VENDOR(Sets.newHashSet(MOVIE_READ, MOVIE_WRITE, CITY_READ, SHOW_READ, SHOW_WRITE, THEATER_READ, THEATER_WRITE));


    private final Set<ApplicationUserPermission> permissions;

    ApplicationUserRole(Set<ApplicationUserPermission> permissions) {
        this.permissions = permissions;
    }

    public Set<ApplicationUserPermission> getPermissions() {
        return permissions;
    }

    public Set<SimpleGrantedAuthority> geGrantedAuthorities(){
        Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());

        permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));


        return permissions;
    }

}
