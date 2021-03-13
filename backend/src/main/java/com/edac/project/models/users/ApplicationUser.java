package com.edac.project.models.users;

import com.edac.project.models.users.Customer;
import com.edac.project.models.users.Vendor;
import com.edac.project.security.ApplicationUserRole;
import com.edac.project.security.PasswordConfig;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Collection;

import static com.edac.project.security.ApplicationUserRole.*;

@Entity
@Table(name = "app_user")
public class ApplicationUser implements UserDetails {

	@Id
	@Column(name = "username", length = 20)
	@NotBlank(message = "Username is required")
	private  String username;

	@Column(name = "password", length = 200)
	@NotBlank(message = "password is required")
	private  String password;

	@Column(name = "role", length = 20)
	@Enumerated(EnumType.STRING)
	private ApplicationUserRole role;

	@Column(name = "is_account_non_expired" )
	private  boolean isAccountNonExpired = true ;

	@Column(name = "is_account_non_locked")
	private  boolean isAccountNonLocked = true;

	@Column(name = "is_credentials_non_expired")
	private  boolean isCredentialsNonExpired = true;

	@Column(name = "is_enabled")
	private  boolean isEnabled = true;

	@JsonIgnore
	@OneToOne(mappedBy = "applicationUser", orphanRemoval = true)
	private Customer customer;

	@JsonIgnore
	@OneToOne(mappedBy = "applicationUser",
			orphanRemoval = true)
	private Vendor vendor;

	public ApplicationUser() {
	}

	public ApplicationUser(
			String username, 
			String password,
			ApplicationUserRole role,
			boolean isAccountNonExpired, boolean isAccountNonLocked,
			boolean isCredentialsNonExpired, boolean isEnabled) {
		this.username = username;
		PasswordConfig passwordConfig = new PasswordConfig();
		this.password = passwordConfig.passwordEncoder().encode(password);
		this.role = role;
		this.isAccountNonExpired = isAccountNonExpired;
		this.isAccountNonLocked = isAccountNonLocked;
		this.isCredentialsNonExpired = isCredentialsNonExpired;
		this.isEnabled = isEnabled;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		if (getRole().equals(CUSTOMER)) {
			return CUSTOMER.geGrantedAuthorities();
		} else if (role.equals(ADMIN)) {
			return ADMIN.geGrantedAuthorities();
		} else if (role.equals(VENDOR)) {
			return VENDOR.geGrantedAuthorities();
		}
		return null;
	}

	@Override
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return isAccountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return isAccountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return isCredentialsNonExpired;
	}

	@Override
	public boolean isEnabled() {
		return isEnabled;
	}

	public ApplicationUserRole getRole() {
		return role;
	}

	public void setRole(ApplicationUserRole role) {
		this.role = role;
	}

}
