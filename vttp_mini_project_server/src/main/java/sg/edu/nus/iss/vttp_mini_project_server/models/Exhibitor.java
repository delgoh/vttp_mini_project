package sg.edu.nus.iss.vttp_mini_project_server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sg.edu.nus.iss.vttp_mini_project_server.dtos.UserDto;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Exhibitor {

    private Integer exhibitorId;

    private String name;

    private String email;

    private String password;

    public static UserDto toUserDto(Exhibitor exhibitor) {
        UserDto userDto = new UserDto();
        userDto.setUsername(exhibitor.getEmail());
        userDto.setId(exhibitor.getExhibitorId());
        userDto.setRole("EXHIBITOR");
        return userDto;
    }
    
}
