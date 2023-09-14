package sg.edu.nus.iss.vttp_mini_project_server.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
// import com.stripe.model.AccountLink;
import com.stripe.model.checkout.Session;
// import com.stripe.param.AccountLinkCreateParams;
import com.stripe.param.checkout.SessionCreateParams;

import sg.edu.nus.iss.vttp_mini_project_server.dtos.PaymentRequestDto;


@Service
public class StripeService {

    @Value("${stripe.api.key}")
    private String STRIPE_API_KEY;

    @Value("${stripe.connected.account.id}")
    private String STRIPE_CONNECTED_ACCOUNT_ID;

    @Value("${server.api.url}")
    private String SERVER_API_URL;

    public String createPaymentLink(PaymentRequestDto urls) {
        Stripe.apiKey = STRIPE_API_KEY;

        System.out.println(">> StripeService: successUrl will be " + SERVER_API_URL + urls.getSuccessUrl());

        SessionCreateParams params = SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl(SERVER_API_URL + urls.getSuccessUrl())
            .setCancelUrl(SERVER_API_URL + urls.getCancelUrl())
            .addLineItem(
                SessionCreateParams.LineItem.builder()
                    .setQuantity(1L)
                    .setPriceData(
                        SessionCreateParams.LineItem.PriceData.builder()
                            .setCurrency("sgd")
                            .setUnitAmount(50L)
                            .setProductData(
                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                    .setName("Total")
                                    .build())
                            .build())
                    .build())
            .build();

        try {
            Session session = Session.create(params);
            System.out.println(">> StripeService: Created session with ID " + session.getId());
            return session.getId();
        } catch (StripeException ex) {
            System.out.println(ex);
        }

        return "";
    }

    /*
     * THIS FEATURE REQUIRES PROPER SETTING UP OF PERSONAL/COMPANY DETAILS
     */

    // public String createAccountLink() throws StripeException {
    //     Stripe.apiKey = STRIPE_API_KEY;

    //     AccountLinkCreateParams params = AccountLinkCreateParams.builder()
    //         .setAccount(STRIPE_CONNECTED_ACCOUNT_ID)
    //         .setRefreshUrl("http://localhost:4200/refresh")
    //         .setReturnUrl("http://localhost:4200/return")
    //         .setType(AccountLinkCreateParams.Type.ACCOUNT_ONBOARDING)
    //         .build();

    //     AccountLink accountLink = AccountLink.create(params);
    //     return accountLink.getUrl();
    // }
    
}
