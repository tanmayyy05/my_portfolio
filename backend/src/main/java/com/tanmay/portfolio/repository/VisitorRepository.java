package com.tanmay.portfolio.repository;

import com.tanmay.portfolio.entity.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {

    @Query("SELECT COUNT(DISTINCT v.ipAddress) FROM Visitor v WHERE v.visitedAt >= :since")
    long countUniqueVisitorsSince(LocalDateTime since);

    long countByVisitedAtAfter(LocalDateTime after);
}
