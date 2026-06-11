package com.tanmay.portfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO {

    private Long id;
    private String title;
    private String subtitle;
    private String description;
    private List<String> tech;
    private String github;
    private String live;
    private String status;
    private boolean featured;
}
