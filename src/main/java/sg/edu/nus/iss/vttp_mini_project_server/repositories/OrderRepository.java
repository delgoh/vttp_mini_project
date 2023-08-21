package sg.edu.nus.iss.vttp_mini_project_server.repositories;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.vttp_mini_project_server.models.Order;

@Repository
public class OrderRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String INSERT_NEW_ORDER_SQL = "INSERT INTO orders VALUES (null, ?, ?, ?, ?, ?)";
    private final String GET_ORDERS_BY_VISITOR_ID_SQL = "SELECT * FROM orders WHERE visitor_id = ?";
    private final String UPDATE_STATUS_BY_ORDER_ID_SQL = "UPDATE orders SET status = ? WHERE order_id = ?";

    public Boolean insertNewOrder(Integer visitorId, Integer productId, Integer quantity, Timestamp orderTimestamp, String status) {
        return jdbcTemplate.update(INSERT_NEW_ORDER_SQL, visitorId, productId, quantity, orderTimestamp, status) > 0;
    }

    public List<Order> getVisitorOrders(Integer visitorId) {
        return jdbcTemplate.query(GET_ORDERS_BY_VISITOR_ID_SQL, BeanPropertyRowMapper.newInstance(Order.class), visitorId);
    }

    public Boolean updateOrderStatus(Integer orderId, String status) {
        return jdbcTemplate.update(UPDATE_STATUS_BY_ORDER_ID_SQL, status, orderId) > 0;
    }
    
}
