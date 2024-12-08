package com.example.nfldb.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.IdClass;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "rushing_stats", schema = "nfldb")
@IdClass(PlayerSeasonId.class)
@Getter
@Setter
public class RushingStats {
    @Id
    private String playerId;
    @Id
    private String season;

    @Column
    private Integer att;

    @Column
    private Integer yds;

    @Column
    private Integer td;

    @Column(name = "1D")
    private Integer firstDowns;

    @Column(name = "Succ%")
    private Integer successPercent;

    @Column(name = "Lng")
    private Integer longestRun;

    @Column(name = "Y/A")
    private Double yardsPerAttempt;

    @Column(name = "Y/G")
    private Double yardsPerGame;

    @Column(name = "A/G")
    private Double attemptsPerGame;

}
