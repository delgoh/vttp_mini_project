package sg.edu.nus.iss.vttp_mini_project_server.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewOrderDto {

    private Integer productId;

    private Integer quantity;
    
}
