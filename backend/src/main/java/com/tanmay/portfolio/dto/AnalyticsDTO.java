package com.tanmay.portfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsDTO {

    private long totalVisitors;
    private long uniqueVisitorsToday;
    private long totalMessages;
    private long unreadMessages;
    private long totalProjectViews;
    private Map<String, Long> projectViewsByName;
    private long newsletterSubscribers;
}
