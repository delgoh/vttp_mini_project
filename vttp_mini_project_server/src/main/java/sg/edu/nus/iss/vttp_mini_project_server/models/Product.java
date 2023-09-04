package sg.edu.nus.iss.vttp_mini_project_server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    private Integer productId;

    private Integer exhibitorId;

    private String name;

    private Float price;

    private String imageUrl;

    private String description;

}
