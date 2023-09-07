package sg.edu.nus.iss.vttp_mini_project_server.payloads.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {

    private String email;

    private String password;
    
    private String name;

    private String role;

    private Object extraDetails;

}
