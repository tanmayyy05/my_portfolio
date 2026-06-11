package com.tanmay.portfolio.service;

import com.tanmay.portfolio.dto.ProjectDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    public List<ProjectDTO> getAllProjects() {
        return List.of(
                ProjectDTO.builder()
                        .id(1L)
                        .title("Employee Attendance Management Platform")
                        .subtitle("Full Stack Application")
                        .description("A comprehensive attendance management system built with Java Spring Boot and React. Features employee and admin dashboards, JWT-based authentication, real-time attendance tracking, and detailed reporting.")
                        .tech(List.of("Java", "Spring Boot", "REST APIs", "MySQL", "React", "JavaScript", "Git"))
                        .github("https://github.com/tanmayyy05")
                        .live(null)
                        .status("In Development")
                        .featured(true)
                        .build(),
                ProjectDTO.builder()
                        .id(2L)
                        .title("Netflix Clone")
                        .subtitle("Frontend Application")
                        .description("A pixel-perfect, responsive Netflix-style UI built with React. Features reusable components, state-based rendering, clean component architecture, and responsive design across all device sizes.")
                        .tech(List.of("React", "JavaScript", "HTML", "CSS", "Git", "GitHub"))
                        .github("https://github.com/tanmayyy05")
                        .live(null)
                        .status("Completed")
                        .featured(false)
                        .build()
        );
    }

    public ProjectDTO getProjectById(Long id) {
        return getAllProjects().stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}
