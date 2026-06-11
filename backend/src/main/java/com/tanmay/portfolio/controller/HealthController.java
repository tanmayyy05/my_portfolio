package com.tanmay.portfolio.controller;

import com.tanmay.portfolio.dto.ApiResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<ApiResponseDTO<Map<String, String>>> health() {
        return ResponseEntity.ok(ApiResponseDTO.success("Service is healthy",
                Map.of("status", "UP", "service", "portfolio-backend")));
    }
}
