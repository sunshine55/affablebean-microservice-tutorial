package tvo.tutorial.microservice.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;
import java.util.Collections;
import java.util.Date;
import java.util.stream.Collectors;

public class JwtCredentialsAuthFilter extends AbstractAuthenticationProcessingFilter {
    private String jwtSecret;
    private ObjectMapper mapper;

    public JwtCredentialsAuthFilter(RequestMatcher requestMatcher, AuthenticationManager authManager, String jwtSecret) {
        super(requestMatcher);
        setAuthenticationManager(authManager);
        this.jwtSecret = jwtSecret;
        this.mapper = new ObjectMapper();
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse rsp) throws AuthenticationException, IOException, ServletException {
        User u = mapper.readValue(req.getInputStream(), User.class);
        return getAuthenticationManager().authenticate(new UsernamePasswordAuthenticationToken(
            u.getUsername(), u.getPassword(), Collections.emptyList()
        ));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse rsp, FilterChain chain, Authentication auth) throws IOException, ServletException {
        Instant now = Instant.now();
        String token = Jwts.builder()
            .setSubject(auth.getName())
            .claim("authorities", auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
            .setIssuedAt(Date.from(now))
            .setExpiration(Date.from(now.plusSeconds(24*60*60)))
            .signWith(SignatureAlgorithm.HS256, jwtSecret.getBytes())
            .compact();
        rsp.addHeader("Authorization", "Bearer " + token);
    }

    private static class User {
        String username, password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
