package top.samoyed24.bookmanager.constant;

import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class BorrowStatusConverter implements Converter<String, BorrowStatus> {
    @Override
    public BorrowStatus convert(@NonNull String source) {
        return Arrays.stream(BorrowStatus.values())
                .filter(e -> e.getValue().equalsIgnoreCase(source))
                .findFirst()
                .orElseThrow(() ->
                        new IllegalArgumentException("Invalid status: " + source));
    }
}
