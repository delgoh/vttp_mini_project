package sg.edu.nus.iss.vttp_mini_project_server.security.jwt;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import sg.edu.nus.iss.vttp_mini_project_server.payloads.dtos.UserDto;

@Component
public class UserAuthProvider {

    @Value("${security.jwt.token.secret:secret}")
    private String rawSecretKey;

    private SecretKey secretKey;

    // private final Integer EXPIRY_DURATION = 3600000; // expiry in milliseconds
    private final Integer EXPIRY_DURATION = 20000; // expiry in milliseconds

    @PostConstruct
    protected void init() {
        secretKey = Keys.hmacShaKeyFor(rawSecretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String createToken(UserDto dto) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + EXPIRY_DURATION);

        return Jwts.builder()
            .setIssuer(dto.getUsername())
            .setIssuedAt(now)
            .setExpiration(expiry)
            .claim("id", dto.getId())
            .claim("username", dto.getUsername())
            .claim("role", dto.getRole())
            .signWith(secretKey)
            .compact();
    }

    public Authentication validateToken(String token) {
        Claims jwtClaims = Jwts.parserBuilder()
            .setSigningKey(secretKey)
            .build()
            .parseClaimsJws(token)
            .getBody();

        UserDto validatedUser = new UserDto();
        validatedUser.setId(jwtClaims.get("id", Integer.class));
        validatedUser.setUsername(jwtClaims.get("username", String.class));
        validatedUser.setRole(jwtClaims.get("role", String.class));
        
        return new UsernamePasswordAuthenticationToken(validatedUser, null, Collections.emptyList());
    }
    
}
