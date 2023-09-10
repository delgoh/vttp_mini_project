package sg.edu.nus.iss.vttp_mini_project_server.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sg.edu.nus.iss.vttp_mini_project_server.models.Exhibitor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExhibitorPublicDto {

    private String exhibitorId;

    private String name;

    public static ExhibitorPublicDto create(Exhibitor exhibitor) {
        return new ExhibitorPublicDto(
            exhibitor.getExhibitorId(),
            exhibitor.getName()
        );
    }
    
}
