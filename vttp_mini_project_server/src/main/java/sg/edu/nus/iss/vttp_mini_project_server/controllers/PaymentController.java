package sg.edu.nus.iss.vttp_mini_project_server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import sg.edu.nus.iss.vttp_mini_project_server.dtos.PaymentRequestDto;
import sg.edu.nus.iss.vttp_mini_project_server.services.OrderService;
import sg.edu.nus.iss.vttp_mini_project_server.services.StripeService;

@RestController
@RequestMapping(path = "/api/checkout")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @Autowired
    private OrderService orderService;


    @PostMapping(path = "/process-orders")
    public ResponseEntity<String> proceedWithPayment(
        @RequestBody List<String> orderIds
    ) {
        System.out.println(">> PaymentController: Processing paid orders...");
        System.out.println(">> PaymentController: First orderId " + orderIds.size());
        Boolean isPaid = orderService.markOrdersAsPaid(orderIds);
        return ResponseEntity.ok(Json.createObjectBuilder()
            .add("isStatusUpdated", isPaid)
            .build()
            .toString());
    }

    @PostMapping
    public ResponseEntity<String> redirectToPayment(@RequestBody PaymentRequestDto urls) {
        System.out.println(">> PaymentController: this endpoint was reached");
        System.out.println(urls);
        System.out.println(">> PaymentController: Creating sessionId");
        String sessionId = stripeService.createPaymentLink(urls);
        System.out.println(">> PaymentController: SessionId created is " + sessionId);
        return ResponseEntity.ok(Json.createObjectBuilder()
                .add("sessionId", sessionId)
                .build()
                .toString());
    }

    
    // @PostMapping
    // public String createAccountLink() throws StripeException {
        
    //     return stripeService.createAccountLink();
    // }
    
}
