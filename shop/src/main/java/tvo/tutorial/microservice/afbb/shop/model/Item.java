package tvo.tutorial.microservice.afbb.shop.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document
@Data
public class Item {
    @Id private String id;
    
    private String name;
    private Integer energy;
    private String category;
}
