package com.tanmay.portfolio.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.lang.NonNull;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Configuration
public class SecurityHeadersConfig {

    @Bean
    @Order(1)
    public OncePerRequestFilter securityHeadersFilter() {
        return new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(@NonNull HttpServletRequest request,
                                             @NonNull HttpServletResponse response,
                                             @NonNull FilterChain filterChain)
                    throws ServletException, IOException {

                response.setHeader("X-Content-Type-Options", "nosniff");
                response.setHeader("X-Frame-Options", "DENY");
                response.setHeader("X-XSS-Protection", "1; mode=block");
                response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
                response.setHeader("Content-Security-Policy",
                        "default-src 'self'; img-src 'self' data: https:; script-src 'self'; style-src 'self' 'unsafe-inline'");
                response.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
                response.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

                filterChain.doFilter(request, response);
            }
        };
    }
}
