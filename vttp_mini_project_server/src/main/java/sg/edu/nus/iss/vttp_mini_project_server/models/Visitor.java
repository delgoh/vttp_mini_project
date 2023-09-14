package sg.edu.nus.iss.vttp_mini_project_server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sg.edu.nus.iss.vttp_mini_project_server.dtos.UserDto;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Visitor {

    private String visitorId;
    
    private String name;

    private String email;

    private String password;

    public static UserDto toUserDto(Visitor visitor) {
        UserDto userDto = new UserDto();
        userDto.setUsername(visitor.getEmail());
        userDto.setId(visitor.getVisitorId());
        userDto.setRole("VISITOR");
        return userDto;
    }

}
