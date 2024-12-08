package com.example.nfldb.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "players", schema = "nfldb")
@Getter
@Setter
public class Player {
    @Id
    private String playerId;
    private String name;
    private Integer age;
    private String currentTeam;
    private String position;

    public String getPlayerId() {
        return playerId;
    }
}