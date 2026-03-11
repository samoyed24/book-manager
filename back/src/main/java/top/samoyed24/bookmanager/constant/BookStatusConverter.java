package top.samoyed24.bookmanager.constant;

import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class BookStatusConverter implements Converter<String, BookStatus> {

    @Override
    public BookStatus convert(@NonNull String source) {
        return Arrays.stream(BookStatus.values())
                .filter(e -> e.getValue().equalsIgnoreCase(source))
                .findFirst()
                .orElseThrow(() ->
                        new IllegalArgumentException("Invalid status: " + source));
    }
}
