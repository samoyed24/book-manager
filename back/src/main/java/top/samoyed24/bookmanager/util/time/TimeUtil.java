package top.samoyed24.bookmanager.util.time;

import jdk.jfr.Name;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Named;
import org.springframework.stereotype.Component;
import top.samoyed24.bookmanager.config.TimeConfig;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Component
public class TimeUtil {
    private final Integer offset;
    private final ZoneOffset zoneOffset;
    private final TimeConfig timeConfig;

    public TimeUtil(TimeConfig timeConfig) {
        this.offset = timeConfig.getOffset();
        this.zoneOffset = ZoneOffset.ofHours(this.offset);
        this.timeConfig = timeConfig;
    }

    public OffsetDateTimePair getOffsetDateTimePairToday() {
        OffsetDateTime startOfDay = LocalDate.now(this.zoneOffset).atStartOfDay().atOffset(this.zoneOffset);
        OffsetDateTime endOfDay = startOfDay.plusDays(1).minusNanos(1);

        return new OffsetDateTimePair(startOfDay, endOfDay);
    }

    public OffsetDateTime getLocalOffsetDateTime() {
        return OffsetDateTime.now(ZoneOffset.ofHours(this.offset));
    }

    public LocalDate getLocalDateOfDefaultOffset() {
        return getLocalOffsetDateTime()
                .atZoneSameInstant(ZoneId.of(timeConfig.getServerTimeZone()))
                .toLocalDate();
    }

    public long getLocalDateDaysDelta(LocalDate localDate) {
        return ChronoUnit.DAYS.between(localDate, getLocalDateOfDefaultOffset());
    }

    // 转换只有年月日的日期字符串
    public LocalDate parseLocalDateOrNull(String isoDtString) {
        return isoDtString != null ? LocalDate.parse(isoDtString) : null;
    }

    public long getOffsetDatetimeDaysDelta(OffsetDateTime odt) {
        ZoneId zone = ZoneId.of(timeConfig.getServerTimeZone());

        LocalDate baseDate = getLocalDateOfDefaultOffset();
        LocalDate targetDate = odt
                .atZoneSameInstant(zone)
                .toLocalDate();

        return ChronoUnit.DAYS.between(baseDate, targetDate);
    }


    // 转换带有时区的完整日期时间字符串
    @Named("dateTimeToLocalDate")
    public LocalDate parseDateTimeToLocalDateOrNull(String isoDtString) {
        if (isoDtString == null || isoDtString.isBlank()) {
            return null;
        }
        return OffsetDateTime.parse(isoDtString)
                .atZoneSameInstant(ZoneId.of(timeConfig.getServerTimeZone()))
                .toLocalDate();
    }

    @Named("offsetDateToLocalDateString")
    public String offsetDateToLocalDateString(OffsetDateTime offsetDateTime) {
        if (offsetDateTime == null) {
            return null;
        }

        return offsetDateTime
                .atZoneSameInstant(ZoneId.of(timeConfig.getServerTimeZone()))
                .toLocalDate()
                .format(DateTimeFormatter.ISO_LOCAL_DATE);
    }

}
