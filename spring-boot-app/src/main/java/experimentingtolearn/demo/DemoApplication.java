package experimentingtolearn.demo;

import java.util.Iterator;
import java.util.function.Function;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootApplication
public class DemoApplication {

	// https://docs.spring.io/spring-cloud-stream/docs/current/reference/html/spring-cloud-stream.html#_multiple_functions_in_a_single_application
	public static void main(String[] args) {
		
		// It might be never run when invocating Lambda function
		SpringApplication.run(DemoApplication.class, args);
	}

	// https://docs.spring.io/spring-cloud-function/docs/current/reference/html/spring-cloud-function.html

	@Bean
	public Function<Message<?>, String> eventHandler() {

		return new Function<Message<?>, String>() {

			@Override
			public String apply(Message<?> message) {

				log.info("Show message from lambda invocation event.");
				log.info("Header:");

				MessageHeaders header = message.getHeaders();
				Iterator<String> iter = header.keySet().iterator();

				while(iter.hasNext()){
					String key = iter.next();
					log.info("\t"+key+": "+header.get(key));
				}

				log.info("Payload:");
				log.info("\t"+message.getPayload().toString());

				
				return "It works.";
			}
		};
	}

}
