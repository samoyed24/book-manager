package top.samoyed24.bookmanager.constant;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

public enum BookStatus {
    BORROWED("borrowed"),
    AVAILABLE("available"),
    CANCELLED("cancelled");

    private final String value;

    BookStatus(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static BookStatus from(String value) {
        return Arrays.stream(values())
                .filter(e -> e.value.equals(value))
                .findFirst()
                .orElseThrow(() ->
                        new IllegalArgumentException("Invalid status: " + value));
    }
}
