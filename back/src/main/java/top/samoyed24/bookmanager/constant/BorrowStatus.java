package top.samoyed24.bookmanager.constant;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

public enum BorrowStatus {
    EXPIRED("expired"),
    NORMAL("normal"),
    RETURNED("returned"),
    DELETED("deleted");

    private final String value;

    BorrowStatus(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static BorrowStatus from(String value) {
        return Arrays.stream(values())
                .filter(e -> e.value.equals(value))
                .findFirst()
                .orElseThrow(() ->
                        new IllegalArgumentException("Invalid status: " + value));
    }
}

