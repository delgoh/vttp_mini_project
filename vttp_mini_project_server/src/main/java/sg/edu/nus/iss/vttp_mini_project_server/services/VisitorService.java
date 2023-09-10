package sg.edu.nus.iss.vttp_mini_project_server.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sg.edu.nus.iss.vttp_mini_project_server.exceptions.UserNotFoundException;
import sg.edu.nus.iss.vttp_mini_project_server.models.Visitor;
import sg.edu.nus.iss.vttp_mini_project_server.repositories.VisitorRepository;

@Service
public class VisitorService {

    @Autowired
    private VisitorRepository visitorRepository;

    public void checkVisitorIdExists(Integer visitorId) {
        Optional<Visitor> visitorOpt = visitorRepository.getVisitorById(visitorId);
        if (visitorOpt.isEmpty()) {
            throw new UserNotFoundException("Visitor with ID %s not found.".formatted(visitorId.toString()));
        }
    }
    
}
