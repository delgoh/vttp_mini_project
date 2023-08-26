package sg.edu.nus.iss.vttp_mini_project_server.models;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    private Integer orderId;

    private Integer visitorId;

    private Integer productId;

    private Integer quantity;

    private Timestamp orderTimestamp;

    private String status;
    
}
