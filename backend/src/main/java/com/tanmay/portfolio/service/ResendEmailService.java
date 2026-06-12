package com.tanmay.portfolio.service;

import com.resend.Resend;
import com.resend.services.emails.model.CreateEmailOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ResendEmailService {

    @Value("${RESEND_API_KEY}")
    private String apiKey;

    public void sendContactEmail(
            String to,
            String name,
            String email,
            String subject,
            String message) {

        try {
            Resend resend = new Resend(apiKey);

            CreateEmailOptions params = CreateEmailOptions.builder()
                    .from("onboarding@resend.dev")
                    .to(to)
                    .subject("Portfolio Contact: " + subject)
                    .html(
                            "<h2>New Portfolio Contact</h2>"
                            + "<p><b>Name:</b> " + name + "</p>"
                            + "<p><b>Email:</b> " + email + "</p>"
                            + "<p><b>Subject:</b> " + subject + "</p>"
                            + "<p><b>Message:</b><br/>" + message + "</p>"
                    )
                    .build();

            resend.emails().send(params);

            log.info("Resend email sent successfully");

        } catch (Exception e) {
            log.error("Resend email failed", e);
        }
    }
}