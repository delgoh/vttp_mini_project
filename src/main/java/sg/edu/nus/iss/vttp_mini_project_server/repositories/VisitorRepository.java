package sg.edu.nus.iss.vttp_mini_project_server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class VisitorRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String INSERT_NEW_VISITOR_BY_EMAIL_SQL = "INSERT INTO visitors (username, email, password) VALUEs (?, ?, ?)";
    // private final String INSERT_NEW_VISITOR_BY_GOOGLE_IDENTITY_SQL = "INSERT INTO visitors (username, google_id) VALUEs (?, ?, ?)";
    private final String DELETE_VISITOR_BY_VISITOR_ID_SQL = "DELETE FROM visitors WHERE visitor_id = ?";
    
    public Boolean insertNewVisitorByEmail(String username, String email, String password) {
        return jdbcTemplate.update(INSERT_NEW_VISITOR_BY_EMAIL_SQL, username, email, password) > 0;
    }

    public Boolean deleteVisitor(Integer visitorId) {
        return jdbcTemplate.update(DELETE_VISITOR_BY_VISITOR_ID_SQL, visitorId) > 0;
    }

}
