package top.samoyed24.bookmanager.exception;

public class GeneralException extends RuntimeException {
    private final int code;
    private final String message;

    public GeneralException(int code, String message) {
        super(message);
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
