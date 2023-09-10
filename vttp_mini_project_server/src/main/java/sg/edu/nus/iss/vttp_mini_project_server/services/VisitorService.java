package sg.edu.nus.iss.vttp_mini_project_server.services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sg.edu.nus.iss.vttp_mini_project_server.exceptions.UserNotFoundException;
import sg.edu.nus.iss.vttp_mini_project_server.models.Visitor;
import sg.edu.nus.iss.vttp_mini_project_server.repositories.VisitorRepository;

@Service
public class VisitorService {

    @Autowired
    private VisitorRepository visitorRepository;

    public Boolean addNewVisitor(String name, String email, String password) {
        Boolean isVisitorAdded = visitorRepository.insertNewVisitor(
            UUID.randomUUID().toString(),
            name,
            email,
            password
        );
        return isVisitorAdded;
    }

    public Visitor getVisitorById(String visitorId) {
        Optional<Visitor> visitorOpt = visitorRepository.getVisitorById(visitorId);
        if (visitorOpt.isEmpty()) {
            throw new UserNotFoundException(
                "Visitor with ID %s not found.".formatted(visitorId)
            );
        } else {
            return visitorOpt.get();
        }
    }

    public Optional<Visitor> getVisitorByEmail(String email) {
        return visitorRepository.getVisitorByEmail(email);
    }

    public void checkVisitorIdExists(String visitorId) {
        Optional<Visitor> visitorOpt = visitorRepository.getVisitorById(visitorId);
        if (visitorOpt.isEmpty()) {
            throw new UserNotFoundException("Visitor with ID %s not found.".formatted(visitorId));
        }
    }
    
}
