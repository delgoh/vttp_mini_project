package sg.edu.nus.iss.vttp_mini_project_server.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class BoothRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String SQL_INSERT_NEW_BOOTH = "INSERT INTO booths VALUES (null, ?, ?)";
    private final String SQL_GET_BOOTH_BY_EXHIBITOR_ID = "SELECT booth_code FROM booths WHERE exhibitor_id = ?";
    private final String SQL_GET_EXHIBITOR_BY_BOOTH_CODE = "SELECT exhibitor_id FROM booths WHERE booth_code = ?";
    private final String SQL_DELETE_BOOTH = "DELETE FROM booths WHERE exhibitor_id = ? AND booth_code = ?";

    public Boolean insertNewBooth(Integer exhibitorId, String boothCode) {
        return jdbcTemplate.update(SQL_INSERT_NEW_BOOTH, exhibitorId, boothCode) > 0;
    }

    public List<String> getBoothCodesByExhibitor(Integer exhibitorId) {
        return jdbcTemplate.query(SQL_GET_BOOTH_BY_EXHIBITOR_ID, BeanPropertyRowMapper.newInstance(String.class), exhibitorId);
    }

    public List<String> getExhibitorsByBooth(String boothCode) {
        return jdbcTemplate.query(SQL_GET_EXHIBITOR_BY_BOOTH_CODE, BeanPropertyRowMapper.newInstance(String.class), boothCode);
    }

    public Boolean deleteBooth(Integer exhibitorId, String boothCode) {
        return jdbcTemplate.update(SQL_DELETE_BOOTH, exhibitorId, boothCode) > 0;
    }
    
}
