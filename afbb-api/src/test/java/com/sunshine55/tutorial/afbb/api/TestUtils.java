package com.sunshine55.tutorial.afbb.api;

import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.sunshine55.tutorial.afbb.api.model.Category;
import com.sunshine55.tutorial.afbb.api.model.Item;

public class TestUtils {
    public static ObjectMapper jsonMapper = new JsonMapper();

    public static TypeReference<List<Category>> categoryListType = new TypeReference<>() {};
    public static TypeReference<List<Item>> itemListType = new TypeReference<>() {};
}
