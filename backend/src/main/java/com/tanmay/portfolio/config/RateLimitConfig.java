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
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Configuration
public class RateLimitConfig {

    private static final int MAX_REQUESTS_PER_MINUTE = 60;
    private static final int MAX_CONTACT_REQUESTS_PER_MINUTE = 5;

    private final ConcurrentHashMap<String, AtomicInteger> requestCounts = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, AtomicInteger> contactRequestCounts = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Long> windowStart = new ConcurrentHashMap<>();

    @Bean
    @Order(2)
    public OncePerRequestFilter rateLimitFilter() {
        return new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(@NonNull HttpServletRequest request,
                                             @NonNull HttpServletResponse response,
                                             @NonNull FilterChain filterChain)
                    throws ServletException, IOException {

                String path = request.getRequestURI();
                if (!path.startsWith("/api/")) {
                    filterChain.doFilter(request, response);
                    return;
                }

                String ip = getClientIp(request);
                long now = System.currentTimeMillis();
                long currentWindow = now / 60000; // 1-minute window

                Long lastWindow = windowStart.get(ip);
                if (lastWindow == null || !lastWindow.equals(currentWindow)) {
                    requestCounts.put(ip, new AtomicInteger(0));
                    contactRequestCounts.put(ip, new AtomicInteger(0));
                    windowStart.put(ip, currentWindow);
                }

                int generalLimit = requestCounts
                        .computeIfAbsent(ip, k -> new AtomicInteger(0))
                        .incrementAndGet();

                if (generalLimit > MAX_REQUESTS_PER_MINUTE) {
                    response.setStatus(429);
                    response.setContentType("application/json");
                    response.getWriter().write(
                        "{\"success\":false,\"message\":\"Rate limit exceeded. Please try again later.\"}"
                    );
                    return;
                }

                if (path.equals("/api/contact") && request.getMethod().equals("POST")) {
                    int contactLimit = contactRequestCounts
                            .computeIfAbsent(ip, k -> new AtomicInteger(0))
                            .incrementAndGet();

                    if (contactLimit > MAX_CONTACT_REQUESTS_PER_MINUTE) {
                        response.setStatus(429);
                        response.setContentType("application/json");
                        response.getWriter().write(
                            "{\"success\":false,\"message\":\"Too many contact requests. Please wait before sending another message.\"}"
                        );
                        return;
                    }
                }

                filterChain.doFilter(request, response);
            }
        };
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
