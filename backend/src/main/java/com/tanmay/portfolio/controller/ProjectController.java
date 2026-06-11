package com.tanmay.portfolio.controller;

import com.tanmay.portfolio.config.IpUtil;
import com.tanmay.portfolio.dto.ApiResponseDTO;
import com.tanmay.portfolio.dto.ProjectDTO;
import com.tanmay.portfolio.exception.ResourceNotFoundException;
import com.tanmay.portfolio.service.AnalyticsService;
import com.tanmay.portfolio.service.ProjectService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final AnalyticsService analyticsService;

    @GetMapping
    public ResponseEntity<ApiResponseDTO<List<ProjectDTO>>> getAllProjects() {
        List<ProjectDTO> projects = projectService.getAllProjects();
        return ResponseEntity.ok(ApiResponseDTO.success("Projects fetched successfully", projects));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<ProjectDTO>> getProjectById(
            @PathVariable Long id, HttpServletRequest request) {

        ProjectDTO project = projectService.getProjectById(id);
        if (project == null) {
            throw new ResourceNotFoundException("Project not found with id: " + id);
        }

        analyticsService.trackProjectView(project.getTitle(), IpUtil.getClientIp(request));

        return ResponseEntity.ok(ApiResponseDTO.success("Project fetched successfully", project));
    }
}
