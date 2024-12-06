package com.example.nfldb.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.IdClass;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "passing_stats", schema = "nfldb")
@IdClass(PlayerSeasonId.class)
public class PassingStats {
    @Id
    private String playerId;
    @Id
    private String season;

    private String QBrec;
    private Integer cmp;
    private Integer att;
    private Double cmpPercent;
    private Integer yds;
    private Integer td;
    private Double tdPercent;
    private Integer interceptions;
    private Double intPercent;
    private Integer firstDowns;
    private Double successPercent;
    private Integer longestPass;
    private Double yardsPerAttempt;
    private Double adjustedYardsPerAttempt;
    private Double yardsPerCompletion;
    private Double yardsPerGame;
    private Double passerRating;
    private Double QBR;
    private Integer sacks;
    private Double netYardsPerAttempt;
    private Double adjustedNetYardsPerAttempt;
    private Integer fourthQuarterComebacks;
    private Integer gameWinningDrives;
}