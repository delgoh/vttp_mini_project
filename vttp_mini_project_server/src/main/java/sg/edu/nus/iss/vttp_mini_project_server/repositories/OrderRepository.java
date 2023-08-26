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

    private final String SQL_INSERT_NEW_ORDER = "INSERT INTO orders VALUES (null, ?, ?, ?, ?, ?)";
    private final String SQL_GET_ORDERS_BY_VISITOR_ID = "SELECT * FROM orders WHERE visitor_id = ?";
    private final String SQL_UPDATE_STATUS_BY_ORDER_ID = "UPDATE orders SET status = ? WHERE order_id = ?";

    public Boolean insertNewOrder(Integer visitorId, Integer productId, Integer quantity, Timestamp orderTimestamp, String status) {
        return jdbcTemplate.update(SQL_INSERT_NEW_ORDER, visitorId, productId, quantity, orderTimestamp, status) > 0;
    }

    public List<Order> getVisitorOrders(Integer visitorId) {
        return jdbcTemplate.query(SQL_GET_ORDERS_BY_VISITOR_ID, BeanPropertyRowMapper.newInstance(Order.class), visitorId);
    }

    public Boolean updateOrderStatus(Integer orderId, String status) {
        return jdbcTemplate.update(SQL_UPDATE_STATUS_BY_ORDER_ID, status, orderId) > 0;
    }
    
}
