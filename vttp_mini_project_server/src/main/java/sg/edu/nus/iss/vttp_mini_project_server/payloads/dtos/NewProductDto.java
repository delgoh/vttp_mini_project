package sg.edu.nus.iss.vttp_mini_project_server.payloads.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewProductDto {

    private String name;

    private Float price;

    private String imageUrl;

    private String description;
    
}
