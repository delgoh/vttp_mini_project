package sg.edu.nus.iss.vttp_mini_project_server.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booth {

    @JsonProperty("booth_id")
    private Integer boothId;

    private Integer exhibitorId;
    
    private String boothCode;

    private String category;
    
}
