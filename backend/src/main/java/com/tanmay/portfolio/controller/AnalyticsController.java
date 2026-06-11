package com.tanmay.portfolio.controller;

import com.tanmay.portfolio.config.IpUtil;
import com.tanmay.portfolio.dto.AnalyticsDTO;
import com.tanmay.portfolio.dto.ApiResponseDTO;
import com.tanmay.portfolio.service.AnalyticsService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping
    public ResponseEntity<ApiResponseDTO<AnalyticsDTO>> getAnalytics() {
        AnalyticsDTO analytics = analyticsService.getAnalytics();
        return ResponseEntity.ok(ApiResponseDTO.success("Analytics fetched successfully", analytics));
    }

    @PostMapping("/track")
    public ResponseEntity<ApiResponseDTO<Void>> trackVisit(
            @RequestBody(required = false) Map<String, String> body,
            HttpServletRequest request) {

        String page = body != null ? body.getOrDefault("page", "/") : "/";
        String referrer = body != null ? body.get("referrer") : request.getHeader("Referer");

        analyticsService.trackVisit(
                IpUtil.getClientIp(request),
                request.getHeader("User-Agent"),
                page,
                referrer
        );

        return ResponseEntity.ok(ApiResponseDTO.success("Visit tracked"));
    }
}
