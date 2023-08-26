package sg.edu.nus.iss.vttp_mini_project_server.exceptions;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ExhibitorNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleExhibitorNotFound(ExhibitorNotFoundException ex, WebRequest req) {
        return new ResponseEntity<ApiErrorResponse>(
            new ApiErrorResponse(
                HttpStatus.NOT_FOUND,
                new Date(),
                ex.getMessage(),
                req.getDescription(false)
            ), HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleProductNotFound(ProductNotFoundException ex, WebRequest req) {
        return new ResponseEntity<ApiErrorResponse>(
            new ApiErrorResponse(
                HttpStatus.NOT_FOUND,
                new Date(),
                ex.getMessage(),
                req.getDescription(false)
            ), HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(InvalidProductExhibitorException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidProductExhibitor(InvalidProductExhibitorException ex, WebRequest req) {
        return new ResponseEntity<ApiErrorResponse>(
            new ApiErrorResponse(
                HttpStatus.FORBIDDEN,
                new Date(),
                ex.getMessage(),
                req.getDescription(false)
            ), HttpStatus.FORBIDDEN
        );
    }
    
}
