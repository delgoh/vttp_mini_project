package sg.edu.nus.iss.vttp_mini_project_server.payloads.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sg.edu.nus.iss.vttp_mini_project_server.models.Exhibitor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExhibitorResponse {

    private Integer exhibitorId;

    private String name;

    private String email;

    public static ExhibitorResponse create(Exhibitor exhibitor) {
        return new ExhibitorResponse(
            exhibitor.getExhibitorId(),
            exhibitor.getName(),
            exhibitor.getEmail()
        );
    }
    
}
