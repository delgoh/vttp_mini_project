package sg.edu.nus.iss.vttp_mini_project_server.exceptions;

public class InvalidProductExhibitorException extends RuntimeException {

    public InvalidProductExhibitorException() {
        super();
    }
    
    public InvalidProductExhibitorException(String message) {
        super(message);
    }
    
    public InvalidProductExhibitorException(Throwable cause) {
        super(cause);
    }
    
    public InvalidProductExhibitorException(String message, Throwable cause) {
        super(message, cause);
    }

}
