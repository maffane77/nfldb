package com.example.nfldb.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.IdClass;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "rushing_stats", schema = "nfldb")
@IdClass(PlayerSeasonId.class)
public class RushingStats {
    @Id
    private String playerId;
    @Id
    private String season;

    private Integer att;
    private Integer yds;
    private Integer td;
    private Integer firstDowns;
    private Integer successPercent;
    private Integer longestRun;
    private Double yardsPerAttempt;
    private Double yardsPerGame;
    private Double attemptsPerGame;
    private Double yardsBeforeContact;
    private Double yardsBeforeContactPerAttempt;
    private Double yardsAfterContact;
    private Double yardsAfterContactPerAttempt;
    private Integer brokenTackles;
}

