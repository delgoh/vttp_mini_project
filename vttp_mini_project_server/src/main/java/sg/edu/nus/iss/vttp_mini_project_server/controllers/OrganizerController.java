package sg.edu.nus.iss.vttp_mini_project_server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import sg.edu.nus.iss.vttp_mini_project_server.services.OrganizerService;

@RestController
// @Secured("ROLE_ORGANIZER")
@RequestMapping(path = "/api/organizer")
public class OrganizerController {

    @Autowired
    private OrganizerService organizerService;

    @GetMapping(path = "/floorplan")
    public ResponseEntity<String> getFloorPlan() {
        String floorPlan = organizerService.getFloorPlan();
        return ResponseEntity.ok(Json.createObjectBuilder()
            .add("floorPlan", floorPlan)
            .build()
            .toString());
    }

    @PostMapping(path = "/floorplan")
    public ResponseEntity<String> saveFloorPlan(@RequestBody String newFloorPlan) {
        organizerService.saveFloorPlan(newFloorPlan);
        return ResponseEntity.ok(Json.createObjectBuilder()
            .add("isSaved", true)
            .build()
            .toString());
    }
    
}
