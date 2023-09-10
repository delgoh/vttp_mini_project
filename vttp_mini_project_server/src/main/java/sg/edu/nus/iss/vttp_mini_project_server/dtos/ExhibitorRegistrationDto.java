package sg.edu.nus.iss.vttp_mini_project_server.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExhibitorRegistrationDto {

    private String name;

    private String email;

    private String password;

    private String pocName;
    
    private String pocPhone;
    
    private String pocEmail;
    
}
