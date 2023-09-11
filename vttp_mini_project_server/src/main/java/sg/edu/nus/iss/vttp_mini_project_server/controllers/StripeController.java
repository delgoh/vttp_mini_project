package sg.edu.nus.iss.vttp_mini_project_server.controllers;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sg.edu.nus.iss.vttp_mini_project_server.services.StripeService;

@RestController
@RequestMapping(path = "/api/checkout")
public class StripeController {

    @Autowired
    private StripeService stripeService;

    // @PostMapping
    // public String createAccountLink() throws StripeException {
        
    //     return stripeService.createAccountLink();
    // }

    @PostMapping
    public ResponseEntity<Void> redirectToPayment() {
        System.out.println(">> This endpoint was reached");
        return ResponseEntity.status(HttpStatus.SEE_OTHER)
            .location(URI.create(stripeService.createPaymentLink()))
            .build();
    }
    
}
