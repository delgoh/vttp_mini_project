package sg.edu.nus.iss.vttp_mini_project_server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class EmailService {

    @Autowired
    private final JavaMailSender javaMailSender;

    @Value("${ventesphere.email}")
    private String ventesphereEmail;

    @Async
    public void sendEmail(String toEmail, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(toEmail);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        mailMessage.setFrom(ventesphereEmail);
        javaMailSender.send(mailMessage);
    }
    
    public String getSubject(String role) {
        return "VenteSphere: Successful Registration - " + role;
    }
    
    public String getMessage(String role) {
        if (role.equals("VISITOR")) {
            return "You have successfully created an account with VenteSphere as a Visitor." +
                    "We hope you enjoy the convenience this app provides for your upcoming event!";
        } else if (role.equals("EXHIBITOR")) {
            return "You have successfully created an account with VenteSphere as an Exhibitor." + 
                    "Please wait for the event organizer to follow up with your onboarding.";
        }
        return "";
    }
    
}
