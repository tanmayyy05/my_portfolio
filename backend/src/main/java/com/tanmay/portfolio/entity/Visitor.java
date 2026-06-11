package com.tanmay.portfolio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "visitors")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Visitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ip_address", length = 50)
    private String ipAddress;

    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent;

    @Column(name = "page_visited", length = 200)
    private String pageVisited;

    @Column(name = "referrer", length = 300)
    private String referrer;

    @Column(name = "visited_at", nullable = false, updatable = false)
    private LocalDateTime visitedAt;

    @PrePersist
    protected void onCreate() {
        visitedAt = LocalDateTime.now();
    }
}
