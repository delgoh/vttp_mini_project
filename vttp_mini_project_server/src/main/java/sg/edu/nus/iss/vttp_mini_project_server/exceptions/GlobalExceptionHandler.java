package sg.edu.nus.iss.vttp_mini_project_server.exceptions;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
        UserNotFoundException.class,
        ProductNotFoundException.class
    })
    public ResponseEntity<ApiErrorResponse> handleEntityNotFound(
        RuntimeException ex,
        WebRequest req
    ) {
        return new ResponseEntity<ApiErrorResponse>(
            new ApiErrorResponse(
                HttpStatus.NOT_FOUND,
                new Date(),
                ex.getMessage(),
                req.getDescription(false)
            ), HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidPassword(
        InvalidPasswordException ex,
        WebRequest req
    ) {
        return new ResponseEntity<ApiErrorResponse>(
            new ApiErrorResponse(
                HttpStatus.UNAUTHORIZED,
                new Date(),
                ex.getMessage(),
                req.getDescription(false)
            ), HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler(ConflictingRegistrationException.class)
    public ResponseEntity<ApiErrorResponse> handleConflictingRegistration(
        ConflictingRegistrationException ex,
        WebRequest req
    ) {
        return new ResponseEntity<ApiErrorResponse>(
            new ApiErrorResponse(
                HttpStatus.CONFLICT,
                new Date(),
                ex.getMessage(),
                req.getDescription(false)
            ), HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(InvalidProductExhibitorException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidProductExhibitor(
        InvalidProductExhibitorException ex,
        WebRequest req
    ) {
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
