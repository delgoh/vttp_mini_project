package sg.edu.nus.iss.vttp_mini_project_server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.json.Json;
import sg.edu.nus.iss.vttp_mini_project_server.dtos.NewOrderDto;
import sg.edu.nus.iss.vttp_mini_project_server.models.Order;
import sg.edu.nus.iss.vttp_mini_project_server.services.OrderService;

@RestController
@RequestMapping(path = "/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<List<Order>> getVisitorOrders(@RequestParam("visitor-id") Integer visitorId) {
        return ResponseEntity.ok(orderService.getVisitorOrders(visitorId));
    }

    @PostMapping
    public ResponseEntity<String> addNewOrder(@RequestParam("visitor-id") Integer visitorId, @RequestParam("exhibitor-id") Integer exhibitorId, @RequestBody NewOrderDto newOrder) {
        Boolean isAdded = orderService.addNewOrder(visitorId, exhibitorId, newOrder);
        return ResponseEntity.ok(Json.createObjectBuilder()
            .add("isAdded", isAdded)
            .build()
            .toString());
    }

    @DeleteMapping
    public ResponseEntity<String> deletePendingOrder(
        @RequestParam(name = "order-id", required = false) Integer orderId,
        @RequestParam(name = "visitor-id", required = false) Integer visitorId,
        @RequestParam(name = "exhibitor-id", required = false) Integer exhibitorId) {

        // if (StringUtils.hasLength(orderId) )

        Boolean isDeleted = orderService.deleteOrderById(orderId);
        return ResponseEntity.ok(Json.createObjectBuilder()
            .add("isDeleted", isDeleted)
            .build()
            .toString());
    }
    
    // @DeleteMapping
    // public ResponseEntity<String> deleteCartOrders(@RequestParam("visitor-id") Integer visitorId, @RequestParam("exhibitor-id") Integer exhibitorId) {
    //     Boolean isDeleted = orderService.deleteOrderByCart(visitorId, exhibitorId);
    //     return ResponseEntity.ok(Json.createObjectBuilder()
    //         .add("isDeleted", isDeleted)
    //         .build()
    //         .toString());
    // }
}
