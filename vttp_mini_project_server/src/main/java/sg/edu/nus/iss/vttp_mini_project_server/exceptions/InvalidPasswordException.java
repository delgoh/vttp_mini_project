package sg.edu.nus.iss.vttp_mini_project_server.exceptions;

public class InvalidPasswordException extends RuntimeException {

    public InvalidPasswordException() {
        super();
    }
    
    public InvalidPasswordException(String message) {
        super(message);
    }
    
    public InvalidPasswordException(Throwable cause) {
        super(cause);
    }
    
    public InvalidPasswordException(String message, Throwable cause) {
        super(message, cause);
    }
    
}
