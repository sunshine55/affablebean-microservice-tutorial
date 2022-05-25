package com.sunshine55.tutorial.afbb.api.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "category")
@Data
public class Category {
    @Id private String id;
    
    private String name;
    private List<Item> items;
}
