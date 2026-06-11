package com.tanmay.portfolio.repository;

import com.tanmay.portfolio.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

    List<ContactMessage> findByIsReadFalseOrderByCreatedAtDesc();

    @Query("SELECT COUNT(c) FROM ContactMessage c WHERE c.createdAt >= :since")
    long countSince(LocalDateTime since);

    boolean existsByEmailAndCreatedAtAfter(String email, LocalDateTime after);
}
