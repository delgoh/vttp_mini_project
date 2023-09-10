package sg.edu.nus.iss.vttp_mini_project_server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sg.edu.nus.iss.vttp_mini_project_server.dtos.ExhibitorRegistrationDto;
import sg.edu.nus.iss.vttp_mini_project_server.dtos.ExhibitorPublicDto;
import sg.edu.nus.iss.vttp_mini_project_server.models.Exhibitor;
import sg.edu.nus.iss.vttp_mini_project_server.services.ExhibitorService;

@RestController
// @Secured("ROLE_EXHIBITOR")
@RequestMapping(path = "/api/exhibitors")
public class ExhibitorController {

    @Autowired
    private ExhibitorService exhibitorService;

    @GetMapping
    public ResponseEntity<List<ExhibitorPublicDto>> getAllExhibitors() {
        List<ExhibitorPublicDto> exhibitorsResponse = exhibitorService.getAllExhibitors()
            .stream()
            .map(ExhibitorPublicDto::create)
            .toList();
        return ResponseEntity.ok(exhibitorsResponse);
    }

    @GetMapping(path = "/{exhibitor-id}")
    public ResponseEntity<ExhibitorPublicDto> getExhibitorById(@PathVariable("exhibitor-id") Integer exhibitorId) {
        Exhibitor exhibitor = exhibitorService.getExhibitorById(exhibitorId);
        return ResponseEntity.ok(ExhibitorPublicDto.create(exhibitor));
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
