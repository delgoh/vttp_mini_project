package sg.edu.nus.iss.vttp_mini_project_server.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sg.edu.nus.iss.vttp_mini_project_server.models.Booth;
import sg.edu.nus.iss.vttp_mini_project_server.models.Exhibitor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoothRegistrationDTO {

    private Exhibitor exhibitor;

    private Booth booth;
    
}
