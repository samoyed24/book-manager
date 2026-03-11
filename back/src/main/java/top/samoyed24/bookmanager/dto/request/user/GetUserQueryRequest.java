package top.samoyed24.bookmanager.dto.request.user;

import lombok.Getter;
import lombok.Setter;
import top.samoyed24.bookmanager.dto.request.wrapper.TableQueryRequestWrapper;

@Getter
@Setter
public class GetUserQueryRequest extends TableQueryRequestWrapper {
    public boolean graduated;
    public String name;
    public String username;
    public String workNumber;
    public String idNumber;
    public String facultyName;
    public String major;
    public String grade;
}
