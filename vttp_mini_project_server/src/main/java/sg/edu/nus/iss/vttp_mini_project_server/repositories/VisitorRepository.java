package sg.edu.nus.iss.vttp_mini_project_server.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.vttp_mini_project_server.models.Visitor;

@Repository
public class VisitorRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String SQL_INSERT_NEW_VISITOR = "INSERT INTO visitors (username, email, password) VALUEs (?, ?, ?)";
    private final String SQL_GET_VISITOR_BY_EMAIL = "SELECT * FROM visitors WHERE email = ?";
    // private final String INSERT_NEW_VISITOR_BY_GOOGLE_IDENTITY_SQL = "INSERT INTO visitors (username, google_id) VALUEs (?, ?, ?)";
    private final String SQL_DELETE_VISITOR_BY_VISITOR_ID = "DELETE FROM visitors WHERE visitor_id = ?";
    
    public Boolean insertNewVisitor(String username, String email, String password) {
        return jdbcTemplate.update(SQL_INSERT_NEW_VISITOR, username, email, password) > 0;
    }

    public Optional<Visitor> getVisitorByEmail(String email) {
        List<Visitor> result = jdbcTemplate.query(SQL_GET_VISITOR_BY_EMAIL, BeanPropertyRowMapper.newInstance(Visitor.class), email);

        if (result.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(result.get(0));
        }
    }

    public Boolean deleteVisitor(Integer visitorId) {
        return jdbcTemplate.update(SQL_DELETE_VISITOR_BY_VISITOR_ID, visitorId) > 0;
    }

}
