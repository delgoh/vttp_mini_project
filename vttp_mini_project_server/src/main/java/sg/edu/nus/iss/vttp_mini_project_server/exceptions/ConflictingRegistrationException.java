package sg.edu.nus.iss.vttp_mini_project_server.exceptions;

public class ConflictingRegistrationException extends RuntimeException {
    
    public ConflictingRegistrationException() {
        super();
    }
    
    public ConflictingRegistrationException(String message) {
        super(message);
    }
    
    public ConflictingRegistrationException(Throwable cause) {
        super(cause);
    }
    
    public ConflictingRegistrationException(String message, Throwable cause) {
        super(message, cause);
    }

}
