package com.example.nfldb.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.IdClass;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "receiving_stats", schema = "nfldb")
@IdClass(PlayerSeasonId.class)
@Getter
@Setter
public class ReceivingStats {
    @Id
    private String playerId;
    @Id
    private String season;

    private Integer tgt;
    private Integer rec;
    private Integer yds;
    @Column(name = "Y/R")
    private Double yardsPerReception;

    @Column
    private Integer td;

    @Column(name = "1D")
    private Integer firstDowns;

    @Column(name = "Succ%")
    private Double successPercent;

    @Column(name = "R/G")
    private Double receptionsPerGame;

    @Column(name = "Y/G")
    private Double yardsPerGame;

    @Column(name = "Ctch%")
    private Double catchPercent;

    @Column(name = "Y/Tgt")
    private Double yardsPerTarget;

    @Column(name = "YBC")
    private Integer yardsBeforeCatch;

}