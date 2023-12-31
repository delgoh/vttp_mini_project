package sg.edu.nus.iss.vttp_mini_project_server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import sg.edu.nus.iss.vttp_mini_project_server.dtos.LoginDto;
import sg.edu.nus.iss.vttp_mini_project_server.dtos.SignupDto;
import sg.edu.nus.iss.vttp_mini_project_server.dtos.UserDto;
import sg.edu.nus.iss.vttp_mini_project_server.security.jwt.UserAuthProvider;
import sg.edu.nus.iss.vttp_mini_project_server.security.services.UserService;

@RestController
@RequestMapping(path = "/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserAuthProvider userAuthProvider;
    
    @PostMapping(path = "/login")
    public ResponseEntity<UserDto> login(@RequestBody LoginDto req) {
        UserDto loggedInUser = userService.loginUser(req);
        loggedInUser.setToken(userAuthProvider.createToken(loggedInUser));
        return ResponseEntity.ok(loggedInUser);
    }

    @PostMapping(path = "/logout")
    public ResponseEntity<String> logout() {
        return null;
    }

    @PostMapping(path = "/signup")
    public ResponseEntity<String> signup(@RequestBody SignupDto req) {
        return ResponseEntity.ok(Json.createObjectBuilder()
            .add("isAdded", userService.signupUser(req).toString())
            .build()
            .toString());
    }

}
