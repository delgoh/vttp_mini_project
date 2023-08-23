package sg.edu.nus.iss.vttp_mini_project_server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PointOfContact {

    private String pocId;
    
    private String exhibitorId;

    private String pocName;

    private String pocPhone;

    private String pocEmail;
    
}
