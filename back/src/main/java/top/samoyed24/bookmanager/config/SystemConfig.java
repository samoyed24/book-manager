package top.samoyed24.bookmanager.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Setter
@Getter
@Component
@ConfigurationProperties(prefix = "system")
public class SystemConfig {
    private Long maxBorrowCount;
    private Long defaultBorrowDays;
    private Double penaltyPerDay;
}

