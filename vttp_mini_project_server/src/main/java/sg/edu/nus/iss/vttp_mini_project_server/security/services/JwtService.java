package sg.edu.nus.iss.vttp_mini_project_server.security.services;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;

@Service
public class JwtService {

    @Value("${security.jwt.token.secret}")
    private String secretKey;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String extractUsername(String token) {
        return null;
    }
    
    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
            // .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

}
