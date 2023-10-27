package team7.maakbaarleuven;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MaakbaarleuvenApplication {
	public static void main(String[] args) {
		SpringApplication.run(MaakbaarleuvenApplication.class, args);
		System.out.println("URL Live Server: http://127.0.0.1:5500/src/main/resources/templates/");
	}
}