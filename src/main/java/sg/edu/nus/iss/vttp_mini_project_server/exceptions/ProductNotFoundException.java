package sg.edu.nus.iss.vttp_mini_project_server.exceptions;

public class ProductNotFoundException extends RuntimeException {

    public ProductNotFoundException() {
        super();
    }
    
    public ProductNotFoundException(String message) {
        super(message);
    }
    
    public ProductNotFoundException(Throwable cause) {
        super(cause);
    }
    
    public ProductNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
    
}
