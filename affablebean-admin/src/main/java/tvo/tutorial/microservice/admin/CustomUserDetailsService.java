package tvo.tutorial.microservice.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public void setPasswordEncoder(BCryptPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AdminMember adminMember = findByUsername(username);
        if (adminMember != null) {
            UserBuilder userBuilder = User.withUsername(username);
            userBuilder.password(passwordEncoder.encode(adminMember.getPassword()));
            adminMember.getRoles().forEach(userBuilder::roles);
            return userBuilder.build();
        } else {
            throw new UsernameNotFoundException("User not found");
        }
    }

    private AdminMember findByUsername(String username) {
        if ("admin".equals(username)) {
            return new AdminMember(username, "admin123", Arrays.asList("ADMIN", "USER"));
        }
        return null;
    }
}
