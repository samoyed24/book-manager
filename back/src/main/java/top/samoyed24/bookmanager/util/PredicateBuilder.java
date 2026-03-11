package top.samoyed24.bookmanager.util;

import jakarta.persistence.criteria.*;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class PredicateBuilder {

    private final CriteriaBuilder cb;

    // AND 条件
    private final List<Predicate> andPredicates = new ArrayList<>();

    // OR 分组（每个元素本身就是一个 or(...)）
    private final List<Predicate> orGroups = new ArrayList<>();

    public PredicateBuilder(CriteriaBuilder cb) {
        this.cb = cb;
    }

    /* ================= AND 条件 ================= */

    public PredicateBuilder equal(Object value, Path<?> path) {
        if (value != null) {
            andPredicates.add(cb.equal(path, value));
        }
        return this;
    }

    public PredicateBuilder notEqual(Object value, Path<?> path) {
        if (value != null) {
            andPredicates.add(cb.notEqual(path, value));
        }
        return this;
    }

    public PredicateBuilder like(String value, Path<String> path) {
        if (StringUtils.hasText(value)) {
            andPredicates.add(cb.like(path, "%" + value + "%"));
        }
        return this;
    }

    public PredicateBuilder between(
            LocalDate start,
            LocalDate end,
            Path<LocalDate> path
    ) {
        if (start != null && end != null) {
            andPredicates.add(cb.between(path, start, end));
        } else if (start != null) {
            andPredicates.add(cb.greaterThanOrEqualTo(path, start));
        } else if (end != null) {
            andPredicates.add(cb.lessThanOrEqualTo(path, end));
        }
        return this;
    }

    public PredicateBuilder between(
            LocalDateTime start,
            LocalDateTime end,
            Path<LocalDateTime> path
    ) {
        if (start != null && end != null) {
            andPredicates.add(cb.between(path, start, end));
        } else if (start != null) {
            andPredicates.add(cb.greaterThanOrEqualTo(path, start));
        } else if (end != null) {
            andPredicates.add(cb.lessThanOrEqualTo(path, end));
        }
        return this;
    }

    /* ================= OR 分组 ================= */

    /**
     * or(...) 内部的条件是 OR
     * 多个 or(...) 之间是 AND
     */
    public PredicateBuilder or(Consumer<PredicateBuilder> consumer) {
        PredicateBuilder orBuilder = new PredicateBuilder(cb);
        consumer.accept(orBuilder);

        if (!orBuilder.andPredicates.isEmpty()) {
            Predicate orPredicate = cb.or(
                    orBuilder.andPredicates.toArray(new Predicate[0])
            );
            orGroups.add(orPredicate);
        }
        return this;
    }

    /* ================= build ================= */

    public Predicate build() {
        List<Predicate> all = new ArrayList<>();
        all.addAll(andPredicates);
        all.addAll(orGroups);

        return all.isEmpty()
                ? cb.conjunction()
                : cb.and(all.toArray(new Predicate[0]));
    }
}
