package sg.edu.nus.iss.vttp_mini_project_server.security.services;

import java.nio.CharBuffer;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import sg.edu.nus.iss.vttp_mini_project_server.dtos.LoginDto;
import sg.edu.nus.iss.vttp_mini_project_server.dtos.SignupDto;
import sg.edu.nus.iss.vttp_mini_project_server.dtos.UserDto;
import sg.edu.nus.iss.vttp_mini_project_server.exceptions.ConflictingRegistrationException;
import sg.edu.nus.iss.vttp_mini_project_server.exceptions.InvalidPasswordException;
import sg.edu.nus.iss.vttp_mini_project_server.exceptions.UserNotFoundException;
import sg.edu.nus.iss.vttp_mini_project_server.models.Exhibitor;
import sg.edu.nus.iss.vttp_mini_project_server.models.Visitor;
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

    public UserDto loginUser(LoginDto loginUser) {

        String loginEmail = loginUser.getEmail().trim().toLowerCase();

        if (loginUser.getRole().equals("VISITOR")) {
            Optional<Visitor> optVisitor = visitorRepository.getVisitorByEmail(loginEmail);
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
            Optional<Exhibitor> optExhibitor = exhibitorRepository.getExhibitorByEmail(loginEmail);
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

    public Boolean signupUser(SignupDto newUser) {
        
        String newEmail = newUser.getEmail().trim().toLowerCase();

        if (newUser.getRole().equals("VISITOR")) {
            Optional<Visitor> optVisitor = visitorRepository.getVisitorByEmail(newEmail);
            if (optVisitor.isPresent()) {
                throw new ConflictingRegistrationException("Email is already registered.");
            }
            Boolean isAdded = visitorRepository.insertNewVisitor(newUser.getName(), newEmail, passwordEncoder.encode(CharBuffer.wrap(newUser.getPassword())));
            return isAdded;

        } else if (newUser.getRole().equals("EXHIBITOR")) {
            Optional<Exhibitor> optExhibitor = exhibitorRepository.getExhibitorByEmail(newEmail);
            if (optExhibitor.isPresent()) {
                throw new ConflictingRegistrationException("Email is already registered.");
            }
            Integer isAdded = exhibitorRepository.insertNewExhibitor(newUser.getName(), newEmail, passwordEncoder.encode(CharBuffer.wrap(newUser.getPassword())));
            return isAdded > 0;
        }

        return false;
    }
    
}
