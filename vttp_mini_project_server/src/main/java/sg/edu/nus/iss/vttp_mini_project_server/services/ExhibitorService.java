package sg.edu.nus.iss.vttp_mini_project_server.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sg.edu.nus.iss.vttp_mini_project_server.dtos.ExhibitorRegistrationDTO;
import sg.edu.nus.iss.vttp_mini_project_server.exceptions.ExhibitorNotFoundException;
import sg.edu.nus.iss.vttp_mini_project_server.models.Exhibitor;
import sg.edu.nus.iss.vttp_mini_project_server.repositories.ExhibitorRepository;
import sg.edu.nus.iss.vttp_mini_project_server.repositories.PointOfContactRepository;

@Service
public class ExhibitorService {

    @Autowired
    private ExhibitorRepository exhibitorRepository;

    @Autowired
    private PointOfContactRepository pocRepository;

    @Transactional
    public Boolean addNewExhibitor(ExhibitorRegistrationDTO dto) {
        Integer newExhibitorId = exhibitorRepository.insertNewExhibitor(dto.getExhibitorName(), dto.getExhibitorEmail());
        pocRepository.insertNewPOC(newExhibitorId, dto.getPocName(), dto.getPocPhone(), dto.getPocEmail());
        return true;
    }

    public void checkExhibitorIdExists(Integer exhibitorId) {
        Optional<Exhibitor> exhibitorOpt = exhibitorRepository.getExhibitorById(exhibitorId);
        if (exhibitorOpt.isEmpty()) {
            throw new ExhibitorNotFoundException("Exhibitor with ID %s not found.".formatted(exhibitorId.toString()));
        }
    }

    public List<Exhibitor> getAllExhibitors() {
        return exhibitorRepository.getAllExhibitors();
    }

    public Exhibitor getExhibitorById(Integer exhibitorId) {
        Optional<Exhibitor> exhibitorOpt = exhibitorRepository.getExhibitorById(exhibitorId);
        if (exhibitorOpt.isEmpty()) {
            throw new ExhibitorNotFoundException("Exhibitor with ID %s not found.".formatted(exhibitorId.toString()));
        } else {
            return exhibitorOpt.get();
        }
    }

    @Transactional
    public Boolean updateExhibitorById(Integer exhibitorId, ExhibitorRegistrationDTO dto) {
        exhibitorRepository.updateExhibitorById(exhibitorId, dto.getExhibitorName(), dto.getExhibitorEmail());
        pocRepository.insertNewPOC(exhibitorId, dto.getPocName(), dto.getPocPhone(), dto.getPocEmail());
        return true;
    } 

    @Transactional
    public Boolean removeExhibitor(Integer exhibitorId) {
        pocRepository.deletePOC(exhibitorId);
        exhibitorRepository.deleteExhibitorById(exhibitorId);
        return true;
    }
    
}