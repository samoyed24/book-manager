package top.samoyed24.bookmanager.util;

import org.springframework.stereotype.Component;

@Component
public class LongUtil {
    public Long parseLongOrNull(String str) {
        try {
            return Long.parseLong(str);
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
