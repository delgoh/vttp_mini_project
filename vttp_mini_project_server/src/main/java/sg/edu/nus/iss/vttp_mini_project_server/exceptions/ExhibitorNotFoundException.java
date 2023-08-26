package sg.edu.nus.iss.vttp_mini_project_server.exceptions;

public class ExhibitorNotFoundException extends RuntimeException {
    
    public ExhibitorNotFoundException() {
        super();
    }
    
    public ExhibitorNotFoundException(String message) {
        super(message);
    }
    
    public ExhibitorNotFoundException(Throwable cause) {
        super(cause);
    }
    
    public ExhibitorNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

}
