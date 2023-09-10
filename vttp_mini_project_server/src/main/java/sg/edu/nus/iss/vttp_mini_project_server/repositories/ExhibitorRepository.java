package sg.edu.nus.iss.vttp_mini_project_server.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.vttp_mini_project_server.models.Exhibitor;

@Repository
public class ExhibitorRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    private final String SQL_INSERT_NEW_EXHIBITOR =
        "INSERT INTO exhibitors VALUES (?, ?, ?, ?)";
    private final String SQL_GET_EXHIBITOR_BY_EXHIBITOR_ID =
        "SELECT * FROM exhibitors WHERE exhibitor_id = ?";
    private final String SQL_GET_EXHIBITOR_BY_EMAIL =
        "SELECT * FROM exhibitors WHERE email = ?";
    private final String SQL_GET_ALL_EXHIBITORS =
        "SELECT * FROM exhibitors";
    private final String SQL_UPDATE_EXHIBITOR_BY_EXHIBITOR_ID =
        "UPDATE exhibitors SET name = ?, email = ?, password = ? WHERE exhibitor_id = ?";
    private final String SQL_DELETE_EXHIBITOR_BY_EXHIBITOR_ID =
        "DELETE FROM exhibitors WHERE exhibitor_id = ?";

    public Boolean insertNewExhibitor(String newId, String name, String email, String password) {
        // GeneratedKeyHolder generatedKeyHolder = new GeneratedKeyHolder();
        // jdbcTemplate.update((connection) -> {
        //     PreparedStatement ps = connection.prepareStatement(SQL_INSERT_NEW_EXHIBITOR, new String[] {"exhibitor_id"});
        //     ps.setString(1, name);
        //     ps.setString(2, email);
        //     ps.setString(3, password);
        //     return ps;
        // }, generatedKeyHolder);
        return jdbcTemplate.update(SQL_INSERT_NEW_EXHIBITOR, newId, name, email, password) > 0;
        // return generatedKeyHolder.getKey().intValue();
    }

    public Optional<Exhibitor> getExhibitorById(String exhibitorId) {
        List<Exhibitor> result = jdbcTemplate.query(
            SQL_GET_EXHIBITOR_BY_EXHIBITOR_ID,
            BeanPropertyRowMapper.newInstance(Exhibitor.class),
            exhibitorId
        );

        if (result.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(result.get(0));
        }
    }

    public Optional<Exhibitor> getExhibitorByEmail(String email) {
        List<Exhibitor> result = jdbcTemplate.query(
            SQL_GET_EXHIBITOR_BY_EMAIL,
            BeanPropertyRowMapper.newInstance(Exhibitor.class),
            email
        );

        if (result.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(result.get(0));
        }
    }

    public List<Exhibitor> getAllExhibitors() {
        return jdbcTemplate.query(
            SQL_GET_ALL_EXHIBITORS,
            BeanPropertyRowMapper.newInstance(Exhibitor.class)
        );
    }

    public Boolean updateExhibitorById(
        String exhibitorId,
        String name,
        String email,
        String password
    ) {
        return jdbcTemplate.update(
            SQL_UPDATE_EXHIBITOR_BY_EXHIBITOR_ID,
            name,
            email,
            password,
            exhibitorId
        ) > 0;
    }

    public Boolean deleteExhibitorById(String exhibitorId) {
        return jdbcTemplate.update(SQL_DELETE_EXHIBITOR_BY_EXHIBITOR_ID, exhibitorId) > 0;
    }

}
