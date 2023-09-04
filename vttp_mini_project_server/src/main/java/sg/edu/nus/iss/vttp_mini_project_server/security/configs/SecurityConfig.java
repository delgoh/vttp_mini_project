package sg.edu.nus.iss.vttp_mini_project_server.security.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(customizer -> customizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests((requests) -> {
                requests
                    .requestMatchers(HttpMethod.POST, "/api/auth/**")
                    .permitAll()

                    .requestMatchers(HttpMethod.POST, "/api/exhibitor/**")
                    .hasRole("EXHIBITOR")

                    .requestMatchers(HttpMethod.POST, "/api/visitor/**")
                    .hasRole("VISITOR")

                    .anyRequest().authenticated();
            });

        return http.build();
    }
    
}
