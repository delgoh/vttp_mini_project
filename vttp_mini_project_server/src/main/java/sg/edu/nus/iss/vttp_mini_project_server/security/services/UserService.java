package sg.edu.nus.iss.vttp_mini_project_server.security.services;

import java.nio.CharBuffer;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import sg.edu.nus.iss.vttp_mini_project_server.exceptions.ConflictingRegistrationException;
import sg.edu.nus.iss.vttp_mini_project_server.exceptions.InvalidPasswordException;
import sg.edu.nus.iss.vttp_mini_project_server.exceptions.UserNotFoundException;
import sg.edu.nus.iss.vttp_mini_project_server.models.Exhibitor;
import sg.edu.nus.iss.vttp_mini_project_server.models.Visitor;
import sg.edu.nus.iss.vttp_mini_project_server.payloads.dtos.UserDto;
import sg.edu.nus.iss.vttp_mini_project_server.payloads.requests.LoginRequest;
import sg.edu.nus.iss.vttp_mini_project_server.payloads.requests.SignupRequest;
import sg.edu.nus.iss.vttp_mini_project_server.repositories.ExhibitorRepository;
import sg.edu.nus.iss.vttp_mini_project_server.repositories.VisitorRepository;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private ExhibitorRepository exhibitorRepository;

    @Autowired
    private VisitorRepository visitorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Visitor> optVisitor = visitorRepository.getVisitorByEmail(email);
        Optional<Exhibitor> optExhibitor = exhibitorRepository.getExhibitorByEmail(email);
        if (optVisitor.isEmpty() && optExhibitor.isEmpty()) {
            throw new UsernameNotFoundException("Email not found");
        }

        if (optVisitor.isPresent()) {
            return Visitor.toUserDto(optVisitor.get());
        } else {
            return Exhibitor.toUserDto(optExhibitor.get());
        }
    }

    public UserDto loginUser(LoginRequest loginUser) {

        if (loginUser.getRole().equals("VISITOR")) {
            Optional<Visitor> optVisitor = visitorRepository.getVisitorByEmail(loginUser.getEmail());
            if (optVisitor.isEmpty()) {
                throw new UserNotFoundException("Visitor email is not registered.");
            }
            Visitor retrievedVisitor = optVisitor.get();
            if (!passwordEncoder.matches(
                    CharBuffer.wrap(loginUser.getPassword()),
                    retrievedVisitor.getPassword())) {
                throw new InvalidPasswordException("Invalid password. Please try again.");
            }
            return Visitor.toUserDto(retrievedVisitor);

        } else if (loginUser.getRole().equals("EXHIBITOR")) {
            Optional<Exhibitor> optExhibitor = exhibitorRepository.getExhibitorByEmail(loginUser.getEmail());
            if (optExhibitor.isEmpty()) {
                throw new UserNotFoundException("Exhibitor email is not registered.");
            }
            Exhibitor retrievedExhibitor = optExhibitor.get();
            if (!passwordEncoder.matches(
                    CharBuffer.wrap(loginUser.getPassword()),
                    retrievedExhibitor.getPassword())) {
                throw new InvalidPasswordException("Invalid password. Please try again.");
            }
            return Exhibitor.toUserDto(retrievedExhibitor);
        }

        return null;
    }

    public Boolean signupUser(SignupRequest newUser) {

        if (newUser.getRole().equals("VISITOR")) {
            Optional<Visitor> optVisitor = visitorRepository.getVisitorByEmail(newUser.getEmail());
            if (optVisitor.isPresent()) {
                throw new ConflictingRegistrationException("Email is already registered.");
            }
            Boolean isAdded = visitorRepository.insertNewVisitor(newUser.getName(), newUser.getEmail(), passwordEncoder.encode(CharBuffer.wrap(newUser.getPassword())));
            return isAdded;

        } else if (newUser.getRole().equals("EXHIBITOR")) {
            Optional<Exhibitor> optExhibitor = exhibitorRepository.getExhibitorByEmail(newUser.getEmail());
            if (optExhibitor.isPresent()) {
                throw new ConflictingRegistrationException("Email is already registered.");
            }
            Integer isAdded = exhibitorRepository.insertNewExhibitor(newUser.getName(), newUser.getEmail(), passwordEncoder.encode(CharBuffer.wrap(newUser.getPassword())));
            return isAdded > 0;
        }

        return false;
    }
    
}
