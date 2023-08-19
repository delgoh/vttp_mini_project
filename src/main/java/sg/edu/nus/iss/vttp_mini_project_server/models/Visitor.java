package sg.edu.nus.iss.vttp_mini_project_server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Visitor {

    private String visitorId;
    
    private String username;

    private String email;

    private String password;

    private String name;

}
