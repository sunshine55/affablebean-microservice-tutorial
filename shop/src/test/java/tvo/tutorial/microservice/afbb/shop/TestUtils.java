package tvo.tutorial.microservice.afbb.shop;

import java.text.SimpleDateFormat;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;

import tvo.tutorial.microservice.afbb.shop.model.Item;

public class TestUtils {
    public static final ObjectMapper jsonMapper = new JsonMapper()
        .setDateFormat(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss"))
        .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    public static final TypeReference<List<Item>> itemListType = new TypeReference<List<Item>>(){};
}
