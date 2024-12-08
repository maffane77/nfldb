package com.example.nfldb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.commons.math3.stat.regression.SimpleRegression;

import com.example.nfldb.repository.PassingRepository;
import com.example.nfldb.repository.PlayerRepository;
import com.example.nfldb.repository.ReceivingRepository;
import com.example.nfldb.repository.RushingRepository;
import com.example.nfldb.entity.PassingStats;
import com.example.nfldb.entity.Player;
import com.example.nfldb.entity.ReceivingStats;
import com.example.nfldb.entity.RushingStats;

import java.util.Map;
import java.util.List;
import java.util.HashMap;
import java.util.stream.Collectors;

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

    public Map<String, Double> predictNextSeasonPassingStats(String playerId) {
        List<PassingStats> stats = passingRepository.findByPlayerId(playerId);

        SimpleRegression yardsRegression = new SimpleRegression();
        SimpleRegression touchdownsRegression = new SimpleRegression();
        SimpleRegression completionsRegression = new SimpleRegression();
        SimpleRegression interceptionsRegression = new SimpleRegression();

        for (PassingStats stat : stats) {
            int season = Integer.parseInt(stat.getSeason());
            if (stat.getYds() != null) {
                yardsRegression.addData(season, stat.getYds());
            }
            if (stat.getTd() != null) {
                touchdownsRegression.addData(season, stat.getTd());
            }
            if (stat.getCmp() != null) {
                completionsRegression.addData(season, stat.getCmp());
            }
            if (stat.getINT() != null) {
                interceptionsRegression.addData(season, stat.getINT());
            }
        }

        int nextSeason = stats.stream()
                .mapToInt(stat -> Integer.parseInt(stat.getSeason()))
                .max()
                .orElse(0) + 1;

        double predictedYards = yardsRegression.predict(nextSeason);
        double predictedTouchdowns = touchdownsRegression.predict(nextSeason);
        double predictedCompletions = completionsRegression.predict(nextSeason);
        double predictedInterceptions = interceptionsRegression.predict(nextSeason);

        Map<String, Double> predictions = new HashMap<>();
        predictions.put("NextSeason", (double) nextSeason);
        predictions.put("PredictedYards", predictedYards > 0 ? predictedYards : 0);
        predictions.put("PredictedTouchdowns", predictedTouchdowns > 0 ? predictedTouchdowns : 0);
        predictions.put("PredictedCompletions", predictedCompletions > 0 ? predictedCompletions : 0);
        predictions.put("PredictedInterceptions", predictedInterceptions > 0 ? predictedInterceptions : 0);

        return predictions;
    }

    public Map<String, Double> predictNextSeasonReceivingStats(String playerId) {
        List<ReceivingStats> stats = receivingRepository.findByPlayerId(playerId);

        SimpleRegression yardsRegression = new SimpleRegression();
        SimpleRegression touchdownsRegression = new SimpleRegression();
        SimpleRegression dropsRegression = new SimpleRegression();
        SimpleRegression receptionsRegression = new SimpleRegression();

        for (ReceivingStats stat : stats) {
            int season = Integer.parseInt(stat.getSeason());
            if (stat.getYds() != null) {
                yardsRegression.addData(season, stat.getYds());
            }
            if (stat.getTd() != null) {
                touchdownsRegression.addData(season, stat.getTd());
            }
            if (stat.getTgt() != null) {
                dropsRegression.addData(season, stat.getTgt());
            }
            if (stat.getRec() != null) {
                receptionsRegression.addData(season, stat.getRec());
            }
        }

        int nextSeason = stats.stream()
                .mapToInt(stat -> Integer.parseInt(stat.getSeason()))
                .max()
                .orElse(0) + 1;

        double predictedYards = yardsRegression.predict(nextSeason);
        double predictedTouchdowns = touchdownsRegression.predict(nextSeason);
        double predictedDrops = dropsRegression.predict(nextSeason);
        double predictedReceptions = receptionsRegression.predict(nextSeason);

        Map<String, Double> predictions = new HashMap<>();
        predictions.put("NextSeason", (double) nextSeason);
        predictions.put("PredictedYards", predictedYards > 0 ? predictedYards : 0);
        predictions.put("PredictedTouchdowns", predictedTouchdowns > 0 ? predictedTouchdowns : 0);
        predictions.put("PredictedTargets", predictedDrops > 0 ? predictedDrops : 0);
        predictions.put("PredictedReceptions", predictedReceptions > 0 ? predictedReceptions : 0);

        return predictions;
    }

    public Map<String, Double> predictNextSeasonRushingStats(String playerId) {
        List<RushingStats> stats = rushingRepository.findByPlayerId(playerId);

        SimpleRegression yardsRegression = new SimpleRegression();
        SimpleRegression touchdownsRegression = new SimpleRegression();
        SimpleRegression attemptsRegression = new SimpleRegression();
        SimpleRegression firstDownsRegression = new SimpleRegression();

        for (RushingStats stat : stats) {
            int season = Integer.parseInt(stat.getSeason());
            if (stat.getYds() != null) {
                yardsRegression.addData(season, stat.getYds());
            }
            if (stat.getTd() != null) {
                touchdownsRegression.addData(season, stat.getTd());
            }
            if (stat.getAtt() != null) {
                attemptsRegression.addData(season, stat.getAtt());
            }
            if (stat.getFirstDowns() != null) {
                firstDownsRegression.addData(season, stat.getFirstDowns());
            }
        }

        int nextSeason = stats.stream()
                .mapToInt(stat -> Integer.parseInt(stat.getSeason()))
                .max()
                .orElse(0) + 1;

        double predictedYards = yardsRegression.predict(nextSeason);
        double predictedTouchdowns = touchdownsRegression.predict(nextSeason);
        double predictedAttempts = attemptsRegression.predict(nextSeason);
        double predictedFirstDowns = firstDownsRegression.predict(nextSeason);

        Map<String, Double> predictions = new HashMap<>();
        predictions.put("NextSeason", (double) nextSeason);
        predictions.put("PredictedYards", predictedYards > 0 ? predictedYards : 0);
        predictions.put("PredictedTouchdowns", predictedTouchdowns > 0 ? predictedTouchdowns : 0);
        predictions.put("PredictedAttempts", predictedAttempts > 0 ? predictedAttempts : 0);
        predictions.put("PredictedFirstDowns", predictedFirstDowns > 0 ? predictedFirstDowns : 0);

        return predictions;
    }

    public Player findPlayerByName(String name) {
        return playerRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Player name invalid or not found"));
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