package com.tanmay.portfolio.controller;

import com.tanmay.portfolio.dto.ApiResponseDTO;
import com.tanmay.portfolio.entity.NewsletterSubscriber;
import com.tanmay.portfolio.repository.NewsletterSubscriberRepository;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/newsletter")
@RequiredArgsConstructor
public class NewsletterController {

    private final NewsletterSubscriberRepository repository;

    @PostMapping("/subscribe")
    public ResponseEntity<ApiResponseDTO<Void>> subscribe(@Valid @RequestBody SubscribeRequest request) {
        String email = request.getEmail().toLowerCase().trim();

        if (repository.existsByEmail(email)) {
            return ResponseEntity.ok(ApiResponseDTO.success("You're already subscribed!"));
        }

        NewsletterSubscriber subscriber = NewsletterSubscriber.builder()
                .email(email)
                .isActive(true)
                .build();

        repository.save(subscriber);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.success("Successfully subscribed to newsletter!"));
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SubscribeRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;
    }
}
