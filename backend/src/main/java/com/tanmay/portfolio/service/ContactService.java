package com.tanmay.portfolio.service;

import com.tanmay.portfolio.dto.ContactRequestDTO;
import com.tanmay.portfolio.entity.ContactMessage;
import com.tanmay.portfolio.exception.RateLimitException;
import com.tanmay.portfolio.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final JavaMailSender mailSender;

    @Value("${app.notification.email:tanmay3011w@gmail.com}")
    private String notificationEmail;

    public ContactMessage saveMessage(ContactRequestDTO dto, String ipAddress) {
        // Rate limiting: max 3 messages per email per hour
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        if (contactMessageRepository.existsByEmailAndCreatedAtAfter(dto.getEmail(), oneHourAgo)) {
            throw new RateLimitException("Too many messages from this email. Please wait before sending again.");
        }

        ContactMessage message = ContactMessage.builder()
                .name(sanitize(dto.getName()))
                .email(dto.getEmail().toLowerCase().trim())
                .subject(sanitize(dto.getSubject()))
                .message(sanitize(dto.getMessage()))
                .ipAddress(ipAddress)
                .build();

        ContactMessage saved = contactMessageRepository.save(message);
        log.info("Contact message saved: id={}, from={}", saved.getId(), saved.getEmail());

        sendEmailNotificationAsync(saved);

        return saved;
    }

    @Async
    public void sendEmailNotificationAsync(ContactMessage message) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(notificationEmail);
            mail.setSubject("Portfolio Contact: " + message.getSubject());
            mail.setText(
                "New contact form submission\n\n" +
                "From: " + message.getName() + " <" + message.getEmail() + ">\n" +
                "Subject: " + message.getSubject() + "\n\n" +
                "Message:\n" + message.getMessage() + "\n\n" +
                "---\n" +
                "IP: " + message.getIpAddress() + "\n" +
                "Time: " + message.getCreatedAt()
            );
            mailSender.send(mail);
            log.info("Email notification sent for message id={}", message.getId());
        } catch (Exception e) {
            log.warn("Failed to send email notification for message id={}: {}", message.getId(), e.getMessage());
        }
    }

    private String sanitize(String input) {
        if (input == null) return null;
        return input.trim()
                .replaceAll("<[^>]*>", "")  // Strip HTML tags
                .replaceAll("[<>\"'&]", ""); // Strip XSS chars
    }
}
