package com.sunshine55.tutorial.afbb.api.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "customer")
@Getter @Setter
@NoArgsConstructor
@EqualsAndHashCode
public class Customer {
    @Id private String id;

    private String fullName, phone, address;
}
