package sg.edu.nus.iss.vttp_mini_project_server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.vttp_mini_project_server.models.Exhibitor;

@Repository
public class ExhibitorRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    private final String INSERT_NEW_EXHIBITOR_SQL = "INSERT INTO exhibitors VALUES (null, ?, ?)";
    private final String GET_EXHIBITOR_BY_EXHIBITOR_ID_SQL = "SELECT * FROM exhibitors WHERE exhibitor_id = ?";
    private final String UPDATE_EXHIBITOR_BY_EXHIBITOR_ID_SQL = "UPDATE exhibitors SET exhibitor_name = ?, category = ? WHERE exhibitor_id = ?";

    public Boolean insertNewExhibitor(String exhibitorName, String category) {
        return jdbcTemplate.update(INSERT_NEW_EXHIBITOR_SQL, exhibitorName, category) > 0;
    }

    public Exhibitor getExhibitor(Integer exhibitorId) {
        return jdbcTemplate.queryForObject(GET_EXHIBITOR_BY_EXHIBITOR_ID_SQL, Exhibitor.class, exhibitorId);
    }

    public Boolean updateExhibitor(Integer exhibitorId, String exhibitorName, String category) {
        return jdbcTemplate.update(UPDATE_EXHIBITOR_BY_EXHIBITOR_ID_SQL, exhibitorName, category, exhibitorId) > 0;
    }

}
