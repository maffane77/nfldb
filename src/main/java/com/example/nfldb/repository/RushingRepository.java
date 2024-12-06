package com.example.nfldb.repository;

import com.example.nfldb.entity.RushingStats;
import com.example.nfldb.entity.PlayerSeasonId;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RushingRepository extends JpaRepository<RushingStats, PlayerSeasonId> {
    List<RushingStats> findByPlayerId(String playerId);
}