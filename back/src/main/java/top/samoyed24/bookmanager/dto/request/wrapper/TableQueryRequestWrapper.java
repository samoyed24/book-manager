package top.samoyed24.bookmanager.dto.request.wrapper;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TableQueryRequestWrapper {
    private Integer pageSize;
    private Integer currentPage;

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage - 1;
    }
}
