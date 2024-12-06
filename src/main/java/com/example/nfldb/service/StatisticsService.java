package com.example.nfldb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.RuntimeBeanNameReference;
import org.springframework.stereotype.Service;

import com.example.nfldb.repository.PassingRepository;
import com.example.nfldb.repository.PlayerRepository;
import com.example.nfldb.repository.ReceivingRepository;
import com.example.nfldb.repository.RushingRepository;
import com.example.nfldb.entity.PassingStats;
import com.example.nfldb.entity.Player;
import com.example.nfldb.entity.ReceivingStats;
import com.example.nfldb.entity.RushingStats;

import java.util.List;
@Service
public class StatisticsService {
    @Autowired
    private PlayerRepository playerRepository;
    @Autowired
    private PassingRepository passingRepository;
    @Autowired 
    private ReceivingRepository receivingRepository;
    @Autowired 
    private RushingRepository rushingRepository;

    public Player findPlayerByName(String name) {
        return playerRepository.findByName(name).orElseThrow(() -> new RuntimeException("Player name invalid or not found"));
    }

    public List<PassingStats> getPassingStatsByPlayerId(String playerId) {
        return passingRepository.findByPlayerId(playerId);
    }
    public List<ReceivingStats> getReceivingStatsByPlayerId(String playerId) {
        return receivingRepository.findByPlayerId(playerId);
    }
    public List<RushingStats> getRushingStatsByPlayerId(String playerId) {
        return rushingRepository.findByPlayerId(playerId);
    }
}
