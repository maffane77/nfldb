package com.example.nfldb.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.IdClass;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "passing_stats", schema = "nfldb")
@IdClass(PlayerSeasonId.class)
@Getter
@Setter
public class PassingStats {
    @Id
    private String playerId;
    @Id
    private String season;

    private Integer cmp;
    private Integer att;

    private Double cmpPercent;

    private Integer yds;
    private Integer td;
    private Double tdPercent;
    private Integer INT;
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

    public Double getCmpPercent() {
        return cmpPercent;
    }

    public void setCmpPercent(Double cmpPercent) {
        this.cmpPercent = cmpPercent;
    }
}