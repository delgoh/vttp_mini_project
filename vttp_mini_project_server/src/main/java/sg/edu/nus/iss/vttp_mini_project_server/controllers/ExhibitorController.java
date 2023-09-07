package sg.edu.nus.iss.vttp_mini_project_server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import sg.edu.nus.iss.vttp_mini_project_server.models.Exhibitor;
import sg.edu.nus.iss.vttp_mini_project_server.payloads.dtos.ExhibitorRegistrationDto;
import sg.edu.nus.iss.vttp_mini_project_server.payloads.responses.ExhibitorResponse;
import sg.edu.nus.iss.vttp_mini_project_server.services.ExhibitorService;

@RestController
// @Secured("ROLE_EXHIBITOR")
@RequestMapping(path = "/api/exhibitors")
public class ExhibitorController {

    @Autowired
    private ExhibitorService exhibitorService;

    @GetMapping
    public ResponseEntity<List<ExhibitorResponse>> getAllExhibitors() {
        List<ExhibitorResponse> exhibitorsResponse = exhibitorService.getAllExhibitors()
            .stream()
            .map(ExhibitorResponse::create)
            .toList();
        return ResponseEntity.ok(exhibitorsResponse);
    }

    @GetMapping(path = "/{exhibitor-id}")
    public ResponseEntity<ExhibitorResponse> getExhibitorById(@PathVariable("exhibitor-id") Integer exhibitorId) {
        // return ResponseEntity.ok();
        Exhibitor exhibitor = exhibitorService.getExhibitorById(exhibitorId);
        return ResponseEntity.ok(ExhibitorResponse.create(exhibitor));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> addNewExhibitor(@RequestBody ExhibitorRegistrationDto dto) {
        Boolean isAdded = exhibitorService.addNewExhibitor(dto);
        return ResponseEntity.ok(isAdded);
    }

    @PutMapping(path = "/{exhibitor-id}")
    public ResponseEntity<Boolean> updateExhibitorById(@PathVariable("exhibitor-id") Integer exhibitorId, @RequestBody ExhibitorRegistrationDto dto) {
        return ResponseEntity.ok(exhibitorService.updateExhibitorById(exhibitorId, dto));
    }
    
}
