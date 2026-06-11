package com.tanmay.portfolio.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/resume")
@Slf4j
public class ResumeController {

    @GetMapping
    public ResponseEntity<Resource> downloadResume() {
        try {
            Resource resource = new ClassPathResource("static/Tanmay_Wagh_Resume.pdf");

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"Tanmay_Wagh_Resume.pdf\"")
                    .body(resource);
        } catch (Exception e) {
            log.error("Error downloading resume", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/view")
    public ResponseEntity<Resource> viewResume() {
        try {
            Resource resource = new ClassPathResource("static/Tanmay_Wagh_Resume.pdf");

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"Tanmay_Wagh_Resume.pdf\"")
                    .body(resource);
        } catch (Exception e) {
            log.error("Error viewing resume", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
