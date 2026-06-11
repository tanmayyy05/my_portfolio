package com.tanmay.portfolio.controller;

import com.tanmay.portfolio.config.IpUtil;
import com.tanmay.portfolio.dto.ApiResponseDTO;
import com.tanmay.portfolio.dto.ContactRequestDTO;
import com.tanmay.portfolio.entity.ContactMessage;
import com.tanmay.portfolio.service.ContactService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ApiResponseDTO<Map<String, Object>>> submitContact(
            @Valid @RequestBody ContactRequestDTO dto,
            HttpServletRequest request) {

        String ipAddress = IpUtil.getClientIp(request);
        ContactMessage saved = contactService.saveMessage(dto, ipAddress);

        Map<String, Object> data = Map.of(
                "id", saved.getId(),
                "submittedAt", saved.getCreatedAt()
        );

        ApiResponseDTO<Map<String, Object>> response = ApiResponseDTO.success(
                "Thank you for your message! I'll get back to you soon.", data
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
