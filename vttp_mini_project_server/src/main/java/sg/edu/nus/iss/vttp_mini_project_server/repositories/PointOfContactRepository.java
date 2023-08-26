package sg.edu.nus.iss.vttp_mini_project_server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PointOfContactRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String SQL_INSERT_NEW_POINT_OF_CONTACT = "INSERT INTO point_of_contacts VALUES (null, ?, ?, ?, ?)";
    private final String SQL_DELETE_POINT_OF_CONTACT_BY_EXHIBITOR_ID = "DELETE FROM point_of_contacts WHERE exhibitor_id = ?";

    public Boolean insertNewPOC(Integer exhibitorId, String pocName, String pocPhone, String pocEmail) {
        return jdbcTemplate.update(SQL_INSERT_NEW_POINT_OF_CONTACT, exhibitorId, pocName, pocPhone, pocEmail) > 0;
    }

    public Boolean deletePOC(Integer exhibitorId) {
        return jdbcTemplate.update(SQL_DELETE_POINT_OF_CONTACT_BY_EXHIBITOR_ID, exhibitorId) > 0;
    }
    
}
