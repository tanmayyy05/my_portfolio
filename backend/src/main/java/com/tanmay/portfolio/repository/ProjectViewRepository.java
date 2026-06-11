package com.tanmay.portfolio.repository;

import com.tanmay.portfolio.entity.ProjectView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectViewRepository extends JpaRepository<ProjectView, Long> {

    @Query("SELECT p.projectName, COUNT(p) FROM ProjectView p GROUP BY p.projectName ORDER BY COUNT(p) DESC")
    List<Object[]> countByProjectName();

    long countByProjectName(String projectName);
}
