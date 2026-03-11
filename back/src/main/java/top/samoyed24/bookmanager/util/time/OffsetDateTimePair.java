package top.samoyed24.bookmanager.util.time;

import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class OffsetDateTimePair {
    OffsetDateTime beginTime;
    OffsetDateTime endTime;

    public OffsetDateTimePair(OffsetDateTime startOfDay, OffsetDateTime endOfDay) {
        this.beginTime = startOfDay;
        this.endTime = endOfDay;
    }
}
