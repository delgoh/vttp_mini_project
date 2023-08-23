package sg.edu.nus.iss.vttp_mini_project_server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sg.edu.nus.iss.vttp_mini_project_server.dtos.ExhibitorRegistrationDTO;
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

    public List<Exhibitor> getAllExhibitors() {
        return exhibitorRepository.getAllExhibitors();
    }

    public Exhibitor getExhibitorById(Integer exhibitorId) {
        return exhibitorRepository.getExhibitorById(exhibitorId);
    }

    public Boolean updateExhibitorById(Integer exhibitorId, ExhibitorRegistrationDTO dto) {
        exhibitorRepository.updateExhibitorById(exhibitorId, dto.getExhibitorName(), dto.getExhibitorEmail());
        pocRepository.insertNewPOC(exhibitorId, dto.getPocName(), dto.getPocPhone(), dto.getPocEmail());
        return true;
    } 

    public Boolean removeExhibitor(Integer exhibitorId) {
        pocRepository.deletePOC(exhibitorId);
        exhibitorRepository.deleteExhibitorById(exhibitorId);
        return true;
    }
    
}
