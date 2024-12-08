package com.example.nfldb.controller;

import com.example.nfldb.entity.PassingStats;
import com.example.nfldb.entity.Player;
import com.example.nfldb.entity.ReceivingStats;
import com.example.nfldb.entity.RushingStats;
import com.example.nfldb.repository.PassingRepository;
import com.example.nfldb.repository.ReceivingRepository;
import com.example.nfldb.repository.RushingRepository;
import com.example.nfldb.service.StatisticsService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
public class StatisticsController {

    private StatisticsService statsService;

    public StatisticsController(StatisticsService statsService) {
        this.statsService = statsService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/player/{name}/passing")
    public List<PassingStats> getPassingStats(@PathVariable String name) {
        System.out.println("Received request for player: " + name);
        Player player = statsService.findPlayerByName(name);
        System.out.println("Found player: " + player);
        List<PassingStats> stats = statsService.getPassingStatsByPlayerId(player.getPlayerId());

        try {
            System.out.println("Returning stats as JSON: " + new ObjectMapper().writeValueAsString(stats));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            System.out.println("Error converting stats to JSON: " + e.getMessage());
        }

        return stats;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/player/{name}/predict/passing")
    public ResponseEntity<Map<String, Double>> predictPassingStats(@PathVariable String name) {
        Player player = statsService.findPlayerByName(name);
        Map<String, Double> predictions = statsService.predictNextSeasonPassingStats(player.getPlayerId());
        return ResponseEntity.ok(predictions);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/player/{name}/receiving")
    public List<ReceivingStats> getReceivingStats(@PathVariable String name) {
        Player player = statsService.findPlayerByName(name);
        return statsService.getReceivingStatsByPlayerId(player.getPlayerId());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/player/{name}/predict/receiving")
    public ResponseEntity<Map<String, Double>> predictReceivingStats(@PathVariable String name) {
        Player player = statsService.findPlayerByName(name);
        Map<String, Double> predictions = statsService.predictNextSeasonReceivingStats(player.getPlayerId());
        return ResponseEntity.ok(predictions);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/player/{name}/rushing")
    public List<RushingStats> getRushingStats(@PathVariable String name) {
        Player player = statsService.findPlayerByName(name);
        return statsService.getRushingStatsByPlayerId(player.getPlayerId());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/player/{name}/predict/rushing")
    public ResponseEntity<Map<String, Double>> predictRushingStats(@PathVariable String name) {
        Player player = statsService.findPlayerByName(name);
        Map<String, Double> predictions = statsService.predictNextSeasonRushingStats(player.getPlayerId());
        return ResponseEntity.ok(predictions);
    }

}