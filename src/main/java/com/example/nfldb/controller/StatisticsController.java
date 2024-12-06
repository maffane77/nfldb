package com.example.nfldb.controller;

import com.example.nfldb.entity.PassingStats;
import com.example.nfldb.entity.ReceivingStats;
import com.example.nfldb.entity.RushingStats;
import com.example.nfldb.repository.PassingRepository;
import com.example.nfldb.repository.ReceivingRepository;
import com.example.nfldb.repository.RushingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/stats")
public class StatisticsController {

    @Autowired
    private PassingRepository passingRepository;

    @Autowired
    private ReceivingRepository receivingRepository;

    @Autowired
    private RushingRepository rushingRepository;

    // Endpoint for passing stats
    @GetMapping("/passing")
    public List<PassingStats> getPassingStats() {
        return passingRepository.findAll();
    }

    // Endpoint for receiving stats
    @GetMapping("/receiving")
    public List<ReceivingStats> getReceivingStats() {
        return receivingRepository.findAll();
    }

    // Endpoint for rushing stats
    @GetMapping("/rushing")
    public List<RushingStats> getRushingStats() {
        return rushingRepository.findAll();
    }
}