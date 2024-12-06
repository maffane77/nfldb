package com.example.nfldb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.example.nfldb.controller.StatisticsController;
@SpringBootApplication(scanBasePackages = "com.example.nfldb")
class NfldbApp {
	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(NfldbApp.class, args);
		StatisticsController controller = context.getBean(StatisticsController.class);
		System.out.println(controller.getPassingStats("Josh Allen"));
	}
}
