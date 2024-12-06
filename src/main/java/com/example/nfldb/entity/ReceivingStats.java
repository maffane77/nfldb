package com.example.nfldb.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.IdClass;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "receiving_stats", schema = "nfldb")
@IdClass(PlayerSeasonId.class)
public class ReceivingStats {
    @Id
    private String playerId;
    @Id
    private String season;

    private Integer tgt;
    private Integer rec;
    private Integer yds;
    private Double yardsPerReception;
    private Integer td;
    private Integer firstDowns;
    private Double successPercent;
    private Double receptionsPerGame;
    private Double yardsPerGame;
    private Double catchPercent;
    private Double yardsPerTarget;
    private Integer yardsBeforeCatch;
    private Double yardsBeforeCatchPerReception;
    private Integer yardsAfterCatch;
    private Integer yardsAfterCatchPerReception;
    private Double averageDepthOfTarget;
    private Integer brokenTackles;
    private Double receptionsPerBrokenTackle;
    private Integer drops;
    private Double dropPercent;
    private Integer interceptions;
}