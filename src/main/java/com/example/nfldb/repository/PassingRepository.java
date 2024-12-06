package com.example.nfldb.repository;

import com.example.nfldb.entity.PassingStats;
import com.example.nfldb.entity.PlayerSeasonId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PassingRepository extends JpaRepository<PassingStats, PlayerSeasonId> {
}