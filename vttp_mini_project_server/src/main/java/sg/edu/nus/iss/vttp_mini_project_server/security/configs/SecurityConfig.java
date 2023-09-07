package sg.edu.nus.iss.vttp_mini_project_server.security.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import sg.edu.nus.iss.vttp_mini_project_server.security.jwt.JwtAuthFilter;
import sg.edu.nus.iss.vttp_mini_project_server.security.jwt.UserAuthProvider;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserAuthProvider userAuthProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(customizer -> customizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(new JwtAuthFilter(userAuthProvider), BasicAuthenticationFilter.class)
            .authorizeHttpRequests(requests -> {
                requests
                    // .requestMatchers(HttpMethod.POST, "/api/auth/**")
                    // .permitAll()

                    // .requestMatchers("/api/exhibitor/**")
                    // .hasRole("EXHIBITOR")

                    // .requestMatchers("/api/visitor/**")
                    // .hasRole("VISITOR")

                    // .anyRequest().authenticated();

                    .anyRequest().permitAll();
            });

        return http.build();
    }
    
}
