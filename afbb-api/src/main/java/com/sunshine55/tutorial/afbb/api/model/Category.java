package com.sunshine55.tutorial.afbb.api.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document(collection = "category")
@Getter @Setter
public class Category {
    @Id private String id;
    
    private String name;
    private List<Item> items;
}
