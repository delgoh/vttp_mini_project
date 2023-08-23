package sg.edu.nus.iss.vttp_mini_project_server.repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.vttp_mini_project_server.models.Exhibitor;

@Repository
public class ExhibitorRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    private final String SQL_INSERT_NEW_EXHIBITOR = "INSERT INTO exhibitors VALUES (null, ?, ?)";
    private final String SQL_GET_EXHIBITOR_BY_EXHIBITOR_ID = "SELECT * FROM exhibitors WHERE exhibitor_id = ?";
    private final String SQL_GET_ALL_EXHIBITORS = "SELECT * FROM exhibitors";
    private final String SQL_UPDATE_EXHIBITOR_BY_EXHIBITOR_ID = "UPDATE exhibitors SET exhibitor_name = ?, exhibitor_email = ? WHERE exhibitor_id = ?";
    private final String SQL_DELETE_EXHIBITOR_BY_EXHIBITOR_ID = "DELETE FROM exhibitors WHERE exhibitor_id = ?";

    public Integer insertNewExhibitor(String exhibitorName, String exhibitorEmail) {
        GeneratedKeyHolder generatedKeyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update((connection) -> {
            PreparedStatement ps = connection.prepareStatement(SQL_INSERT_NEW_EXHIBITOR, new String[] {"exhibitor_id"});
            ps.setString(1, exhibitorName);
            ps.setString(2, exhibitorEmail);
            return ps;
        }, generatedKeyHolder);
        return generatedKeyHolder.getKey().intValue();
    }

    public Exhibitor getExhibitorById(Integer exhibitorId) {
        return jdbcTemplate.queryForObject(SQL_GET_EXHIBITOR_BY_EXHIBITOR_ID, Exhibitor.class, exhibitorId);
    }

    public List<Exhibitor> getAllExhibitors() {
        return jdbcTemplate.query(SQL_GET_ALL_EXHIBITORS, BeanPropertyRowMapper.newInstance(Exhibitor.class));
    }

    public Boolean updateExhibitorById(Integer exhibitorId, String exhibitorName, String exhibitorEmail) {
        return jdbcTemplate.update(SQL_UPDATE_EXHIBITOR_BY_EXHIBITOR_ID, exhibitorName, exhibitorEmail, exhibitorId) > 0;
    }

    public Boolean deleteExhibitorById(Integer exhibitorId) {
        return jdbcTemplate.update(SQL_DELETE_EXHIBITOR_BY_EXHIBITOR_ID, exhibitorId) > 0;
    }

}
