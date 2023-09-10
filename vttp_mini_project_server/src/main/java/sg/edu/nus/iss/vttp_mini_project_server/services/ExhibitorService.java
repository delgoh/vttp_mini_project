package sg.edu.nus.iss.vttp_mini_project_server.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sg.edu.nus.iss.vttp_mini_project_server.exceptions.UserNotFoundException;
import sg.edu.nus.iss.vttp_mini_project_server.models.Exhibitor;
import sg.edu.nus.iss.vttp_mini_project_server.repositories.ExhibitorRepository;
// import sg.edu.nus.iss.vttp_mini_project_server.repositories.PointOfContactRepository;

@Service
public class ExhibitorService {

    @Autowired
    private ExhibitorRepository exhibitorRepository;

    // @Autowired
    // private PointOfContactRepository pocRepository;

    @Transactional
    public Boolean addNewExhibitor(String name, String email, String password) {
        String newExhibitorId = UUID.randomUUID().toString();
        Boolean isAdded = exhibitorRepository.insertNewExhibitor(
            newExhibitorId,
            name,
            email,
            password
        );
        // pocRepository.insertNewPOC(newExhibitorId, dto.getPocName(), dto.getPocPhone(), dto.getPocEmail());
        return isAdded;
    }

    public List<Exhibitor> getAllExhibitors() {
        return exhibitorRepository.getAllExhibitors();
    }

    public Exhibitor getExhibitorById(String exhibitorId) {
        Optional<Exhibitor> exhibitorOpt = exhibitorRepository.getExhibitorById(exhibitorId);
        if (exhibitorOpt.isEmpty()) {
            throw new UserNotFoundException(
                "Exhibitor with ID %s not found.".formatted(exhibitorId)
            );
        } else {
            return exhibitorOpt.get();
        }
    }

    public Optional<Exhibitor> getExhibitorByEmail(String email) {
        return exhibitorRepository.getExhibitorByEmail(email);
    }

    public void checkExhibitorIdExists(String exhibitorId) {
        Optional<Exhibitor> exhibitorOpt = exhibitorRepository.getExhibitorById(exhibitorId);
        if (exhibitorOpt.isEmpty()) {
            throw new UserNotFoundException(
                "Exhibitor with ID %s not found.".formatted(exhibitorOpt)
            );
        }
    }

    // @Transactional
    // public Boolean updateExhibitorById(String exhibitorId, ExhibitorRegistrationDto dto) {
    //     Boolean isUpdated = exhibitorRepository.updateExhibitorById(
    //         exhibitorId,
    //         dto.getName(),
    //         dto.getEmail(),
    //         dto.getPassword()
    //     );
    //     // pocRepository.insertNewPOC(exhibitorId, dto.getPocName(), dto.getPocPhone(), dto.getPocEmail());
    //     return isUpdated;
    // }

    // @Transactional
    // public Boolean removeExhibitor(String exhibitorId) {
    //     // pocRepository.deletePOC(exhibitorId);
    //     exhibitorRepository.deleteExhibitorById(exhibitorId);
    //     return true;
    // }
    
}
