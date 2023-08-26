package sg.edu.nus.iss.vttp_mini_project_server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sg.edu.nus.iss.vttp_mini_project_server.dtos.ExhibitorRegistrationDTO;
import sg.edu.nus.iss.vttp_mini_project_server.models.Exhibitor;
import sg.edu.nus.iss.vttp_mini_project_server.services.ExhibitorService;

@RestController
@RequestMapping(path = "/api/exhibitors")
public class ExhibitorController {

    @Autowired
    private ExhibitorService exhibitorService;

    @GetMapping
    public ResponseEntity<List<Exhibitor>> getAllExhibitors() {
        return ResponseEntity.ok(exhibitorService.getAllExhibitors());
    }

    @GetMapping(path = "/{exhibitor-id}")
    public ResponseEntity<Exhibitor> getExhibitorById(@PathVariable("exhibitor-id") Integer exhibitorId) {
        return ResponseEntity.ok(exhibitorService.getExhibitorById(exhibitorId));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> addNewExhibitor(@RequestBody ExhibitorRegistrationDTO dto) {
        Boolean isAdded = exhibitorService.addNewExhibitor(dto);
        return ResponseEntity.ok(isAdded);
    }

    @PutMapping(path = "/{exhibitor-id}")
    public ResponseEntity<Boolean> updateExhibitorById(@PathVariable("exhibitor-id") Integer exhibitorId, @RequestBody ExhibitorRegistrationDTO dto) {
        return ResponseEntity.ok(exhibitorService.updateExhibitorById(exhibitorId, dto));
    }
    
}
