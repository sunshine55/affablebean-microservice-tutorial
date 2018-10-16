package tvo.tutorial.microservice.admin;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AdminMember adminMember = findByUsername(username);
        if (adminMember == null) {
            throw new UsernameNotFoundException(username);
        }
        return new User(adminMember.getUsername(), adminMember.getPassword(), Collections.emptyList());
    }

    private AdminMember findByUsername(String username) {
        if ("admin".equals(username)) {
            return new AdminMember(username, "admin123");
        }
        return null;
    }
}
