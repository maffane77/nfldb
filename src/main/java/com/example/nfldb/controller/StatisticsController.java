package com.example.nfldb.controller;

import com.example.nfldb.entity.PassingStats;
import com.example.nfldb.entity.Player;
import com.example.nfldb.entity.ReceivingStats;
import com.example.nfldb.entity.RushingStats;
import com.example.nfldb.repository.PassingRepository;
import com.example.nfldb.repository.ReceivingRepository;
import com.example.nfldb.repository.RushingRepository;
import com.example.nfldb.service.StatisticsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/stats")
public class StatisticsController {

    @Autowired
    private StatisticsService statsService;

    @GetMapping("/player/{name}/passing")
    public List<PassingStats> getPassingStats(@PathVariable String name) {
        Player player = statsService.findPlayerByName(name);
        return statsService.getPassingStatsByPlayerId(player.getPlayerId());
    }

    @GetMapping("/player/{name}/receiving")
    public List<ReceivingStats> getReceivingStats(@PathVariable String name) {
        Player player = statsService.findPlayerByName(name);
        return statsService.getReceivingStatsByPlayerId(player.getPlayerId());
    }

    @GetMapping("/player/{name}/rushing")
    public List<RushingStats> getRushingStats(@PathVariable String name) {
        Player player = statsService.findPlayerByName(name);
        return statsService.getRushingStatsByPlayerId(player.getPlayerId());
    }
}