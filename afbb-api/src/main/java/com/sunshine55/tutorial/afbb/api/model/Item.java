package com.sunshine55.tutorial.afbb.api.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "item")
@Getter @Setter
@NoArgsConstructor
@EqualsAndHashCode
public class Item {
    @Id private String id;

    private String name;
    private String description;
    private Float price;

    @EqualsAndHashCode.Exclude private Category category;
}
