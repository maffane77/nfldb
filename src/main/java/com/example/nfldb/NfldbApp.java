package com.example.nfldb;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.nfldb.controller.*;
import com.example.nfldb.entity.PassingStats;

import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.ApplicationContext;

@SpringBootApplication(scanBasePackages = "com.example.nfldb")
class NfldbApp {
	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(NfldbApp.class, args);
		StatisticsController controller = context.getBean(StatisticsController.class);

		System.out.println(controller.predictPassingStats("Josh Allen"));
	}
}
