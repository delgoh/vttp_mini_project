package sg.edu.nus.iss.vttp_mini_project_server.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import sg.edu.nus.iss.vttp_mini_project_server.services.OrderService;
import sg.edu.nus.iss.vttp_mini_project_server.services.StripeService;

@RestController
@RequestMapping(path = "/api/checkout")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @Autowired
    private OrderService orderService;


    @PostMapping(path = "/development")
    public ResponseEntity<String> proceedwithPayment(
        @RequestBody List<String> orderIds
    ) {
        Boolean isPaid = orderService.markOrdersAsPaid(orderIds);
        return ResponseEntity.ok(Json.createObjectBuilder()
            .add("isStatusUpdated", isPaid)
            .build()
            .toString());
    }

    @PostMapping
    public ResponseEntity<Void> redirectToPayment() {
        System.out.println(">> This endpoint was reached");
        return ResponseEntity.status(HttpStatus.SEE_OTHER)
            .location(URI.create(stripeService.createPaymentLink()))
            .build();
    }

    
    // @PostMapping
    // public String createAccountLink() throws StripeException {
        
    //     return stripeService.createAccountLink();
    // }
    
}
