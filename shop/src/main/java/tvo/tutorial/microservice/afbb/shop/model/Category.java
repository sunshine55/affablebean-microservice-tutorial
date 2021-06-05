package tvo.tutorial.microservice.afbb.shop.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document
@Data
public class Category {
    @Id
    private String id;
    private String name;
    private List<Item> items;
}
