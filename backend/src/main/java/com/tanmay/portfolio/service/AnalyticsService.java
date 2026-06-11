package com.tanmay.portfolio.service;

import com.tanmay.portfolio.dto.AnalyticsDTO;
import com.tanmay.portfolio.entity.Visitor;
import com.tanmay.portfolio.entity.ProjectView;
import com.tanmay.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnalyticsService {

    private final VisitorRepository visitorRepository;
    private final ContactMessageRepository contactMessageRepository;
    private final ProjectViewRepository projectViewRepository;
    private final NewsletterSubscriberRepository newsletterSubscriberRepository;

    public void trackVisit(String ipAddress, String userAgent, String page, String referrer) {
        try {
            Visitor visitor = Visitor.builder()
                    .ipAddress(ipAddress)
                    .userAgent(userAgent)
                    .pageVisited(page)
                    .referrer(referrer)
                    .build();
            visitorRepository.save(visitor);
        } catch (Exception e) {
            log.warn("Failed to track visit: {}", e.getMessage());
        }
    }

    public void trackProjectView(String projectName, String ipAddress) {
        try {
            ProjectView view = ProjectView.builder()
                    .projectName(projectName)
                    .ipAddress(ipAddress)
                    .build();
            projectViewRepository.save(view);
        } catch (Exception e) {
            log.warn("Failed to track project view: {}", e.getMessage());
        }
    }

    public AnalyticsDTO getAnalytics() {
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);

        Map<String, Long> projectViews = new HashMap<>();
        List<Object[]> rawViews = projectViewRepository.countByProjectName();
        for (Object[] row : rawViews) {
            projectViews.put((String) row[0], (Long) row[1]);
        }

        return AnalyticsDTO.builder()
                .totalVisitors(visitorRepository.count())
                .uniqueVisitorsToday(visitorRepository.countUniqueVisitorsSince(startOfDay))
                .totalMessages(contactMessageRepository.count())
                .unreadMessages(contactMessageRepository.findByIsReadFalseOrderByCreatedAtDesc().size())
                .totalProjectViews(projectViewRepository.count())
                .projectViewsByName(projectViews)
                .newsletterSubscribers(newsletterSubscriberRepository.count())
                .build();
    }
}
