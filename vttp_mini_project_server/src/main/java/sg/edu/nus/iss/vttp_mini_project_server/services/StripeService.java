package sg.edu.nus.iss.vttp_mini_project_server.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
// import com.stripe.model.AccountLink;
import com.stripe.model.checkout.Session;
// import com.stripe.param.AccountLinkCreateParams;
import com.stripe.param.checkout.SessionCreateParams;


@Service
public class StripeService {

    @Value("${stripe.api.key}")
    private String STRIPE_API_KEY;

    @Value("${stripe.connected.account.id}")
    private String STRIPE_CONNECTED_ACCOUNT_ID;

    private final String SERVER_API_URL = "http://localhost:4200/";

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

    public String createPaymentLink() {
        Stripe.apiKey = STRIPE_API_KEY;

        SessionCreateParams params = SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl(SERVER_API_URL + "/success")
            .setCancelUrl(SERVER_API_URL + "/cancel")
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
                                    .build()
                            )
                            .build()
                    )
                    .build()
            )
            .build();

        try {
            Session session = Session.create(params);
            return session.getUrl();
        } catch (StripeException ex) {
            System.out.println(ex);
        }

        return "";
    }

    /*
     * post("/create-checkout-session", (request, response) -> {
        String YOUR_DOMAIN = "http://localhost:4242";
        SessionCreateParams params =
          SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl(YOUR_DOMAIN + "/success.html")
            .setCancelUrl(YOUR_DOMAIN + "/cancel.html")
            .addLineItem(
              SessionCreateParams.LineItem.builder()
                .setQuantity(1L)
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                .setPrice("{{PRICE_ID}}")
                .build())
            .build();
      Session session = Session.create(params);

      response.redirect(session.getUrl(), 303);
      return "";
     */
    
}
