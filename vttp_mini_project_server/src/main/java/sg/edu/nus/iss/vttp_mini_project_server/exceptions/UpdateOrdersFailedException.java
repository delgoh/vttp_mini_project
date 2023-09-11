package sg.edu.nus.iss.vttp_mini_project_server.exceptions;

public class UpdateOrdersFailedException extends RuntimeException {
    
    public UpdateOrdersFailedException() {
        super();
    }
    
    public UpdateOrdersFailedException(String message) {
        super(message);
    }
    
    public UpdateOrdersFailedException(Throwable cause) {
        super(cause);
    }
    
    public UpdateOrdersFailedException(String message, Throwable cause) {
        super(message, cause);
    }

}
