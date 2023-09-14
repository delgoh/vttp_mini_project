package sg.edu.nus.iss.vttp_mini_project_server.services;

import org.springframework.stereotype.Service;

@Service
public class OrganizerService {

    // VERY BAD PRACTICE, temporary storage solution for image
    private String DATA_STRING = "";

    public String getFloorPlan() {
        return DATA_STRING;
    }

    public void saveFloorPlan(String newFloorPlan) {
        DATA_STRING = newFloorPlan;
    }
    
}
