package com.sunshine55.tutorial.afbb.api.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "order")
@Getter @Setter
@NoArgsConstructor
@EqualsAndHashCode
public class Order {
    @Id private String id;

    private Integer quantity;
    private LocalDateTime orderDateTime;

    @EqualsAndHashCode.Exclude private Customer customer;
    @EqualsAndHashCode.Exclude private Item item;
}
