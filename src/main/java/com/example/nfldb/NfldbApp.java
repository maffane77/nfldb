package com.example.nfldb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.nfldb.controller.*;

@SpringBootApplication
class NfldbApp {

	public static void main(String[] args) {
		SpringApplication.run(NfldbApp.class, args);

		StatisticsController controller = new StatisticsController();
		System.out.println(controller.getPassingStats());
	}
}
