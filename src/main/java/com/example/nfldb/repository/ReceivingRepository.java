package com.example.nfldb.repository;

import com.example.nfldb.entity.ReceivingStats;
import com.example.nfldb.entity.PlayerSeasonId;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReceivingRepository extends JpaRepository<ReceivingStats, PlayerSeasonId> {
    List<ReceivingStats> findByPlayerId(String playerId);
}