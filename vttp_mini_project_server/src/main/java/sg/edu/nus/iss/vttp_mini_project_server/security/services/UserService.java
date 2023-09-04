package sg.edu.nus.iss.vttp_mini_project_server.security.services;

import java.nio.CharBuffer;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
public class UserService {

    @Autowired
    private ExhibitorRepository exhibitorRepository;

    @Autowired
    private VisitorRepository visitorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDto loginUser(LoginRequest loginUser) {

        if (loginUser.getRole().equals("ROLE_VISITOR")) {
            Optional<Visitor> optVisitor = visitorRepository.getVisitorByEmail(loginUser.getUsername());
            if (optVisitor.isEmpty()) {
                throw new UserNotFoundException("Visitor not found.");
            }
            Visitor retrievedVisitor = optVisitor.get();
            if (!passwordEncoder.matches(
                    CharBuffer.wrap(loginUser.getPassword()),
                    retrievedVisitor.getPassword())) {
                throw new InvalidPasswordException("Invalid password.");
            }
            return Visitor.toUserDto(retrievedVisitor);

        } else if (loginUser.getRole().equals("ROLE_EXHIBITOR")) {
            Optional<Exhibitor> optExhibitor = exhibitorRepository.getExhibitorByEmail(loginUser.getUsername());
            if (optExhibitor.isEmpty()) {
                throw new UserNotFoundException("Exhibitor not found.");
            }
            Exhibitor retrievedExhibitor = optExhibitor.get();
            if (!passwordEncoder.matches(
                    CharBuffer.wrap(loginUser.getPassword()),
                    retrievedExhibitor.getPassword())) {
                throw new InvalidPasswordException("Invalid password.");
            }
            return Exhibitor.toUserDto(retrievedExhibitor);
        }

        return null;
    }

    public Boolean signupUser(SignupRequest newUser) {

        if (newUser.getRole().equals("ROLE_VISITOR")) {
            Optional<Visitor> optVisitor = visitorRepository.getVisitorByEmail(newUser.getEmail());
            if (optVisitor.isPresent()) {
                throw new ConflictingRegistrationException("Email is already registered.");
            }
            Boolean isAdded = visitorRepository.insertNewVisitor(newUser.getUsername(), newUser.getEmail(), passwordEncoder.encode(CharBuffer.wrap(newUser.getPassword())));
            return isAdded;

        } else if (newUser.getRole().equals("ROLE_EXHIBITOR")) {
            Optional<Exhibitor> optExhibitor = exhibitorRepository.getExhibitorByEmail(newUser.getEmail());
            if (optExhibitor.isPresent()) {
                throw new ConflictingRegistrationException("Email is already registered.");
            }
            Integer isAdded = exhibitorRepository.insertNewExhibitor(newUser.getUsername(), newUser.getEmail(), passwordEncoder.encode(CharBuffer.wrap(newUser.getPassword())));
            return isAdded > 0;
        }

        return null;
    }
    
}
