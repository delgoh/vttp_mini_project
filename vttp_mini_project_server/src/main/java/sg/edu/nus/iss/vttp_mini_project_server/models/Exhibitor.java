package sg.edu.nus.iss.vttp_mini_project_server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Exhibitor {

    private Integer exhibitorId;

    private String exhibitorName;

    private String exhibitorEmail;
    
}
