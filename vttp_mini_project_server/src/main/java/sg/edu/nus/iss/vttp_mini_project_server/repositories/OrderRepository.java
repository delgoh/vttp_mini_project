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

    private final String SQL_INSERT_NEW_ORDER =
        "INSERT INTO orders VALUES (?, ?, ?, ?, ?, ?, ?)";
    private final String SQL_GET_PENDING_ORDERS_BY_VISITOR_ID =
        "SELECT * FROM orders WHERE visitor_id = ? AND status = 'PENDING'";
    private final String SQL_UPDATE_STATUS_BY_ORDER_ID =
        "UPDATE orders SET status = ? WHERE order_id = ?";
    private final String SQL_UPDATE_STATUS_BY_VISITOR_AND_EXHIBITOR_ID =
        "UPDATE orders SET status = ? WHERE visitor_id = ? AND exhibitor_id = ?";
    private final String SQL_DELETE_ORDER_BY_ORDER_ID =
        "DELETE FROM orders WHERE order_id = ?";
    private final String SQL_DELETE_ORDER_BY_VISITOR_AND_EXHIBITOR_ID =
        "DELETE FROM orders WHERE visitor_id = ? AND exhibitor_id = ?";

    public Boolean insertNewOrder(
        String newId,
        String visitorId,
        String exhibitorId,
        String productId,
        Integer quantity,
        Timestamp orderTimestamp,
        String status
    ) {
        return jdbcTemplate.update(
            SQL_INSERT_NEW_ORDER,
            newId,
            visitorId,
            exhibitorId,
            productId,
            quantity,
            orderTimestamp,
            status
        ) > 0;
    }

    public List<Order> getVisitorPendingOrders(String visitorId) {
        return jdbcTemplate.query(
            SQL_GET_PENDING_ORDERS_BY_VISITOR_ID,
            BeanPropertyRowMapper.newInstance(Order.class),
            visitorId
        );
    }

    public Boolean updateOrderStatusById (String orderId, String status) {
        return jdbcTemplate.update(SQL_UPDATE_STATUS_BY_ORDER_ID, status, orderId) > 0;
    }

    public Boolean updateOrderStatusByVisitorAndExhibitorId (
        String visitorId,
        String exhibitorId,
        String status
    ) {
        return jdbcTemplate.update(
            SQL_UPDATE_STATUS_BY_VISITOR_AND_EXHIBITOR_ID,
            status,
            visitorId,
            exhibitorId
        ) > 0;
    }
    
    public Boolean deleteOrderById(String orderId) {
        return jdbcTemplate.update(SQL_DELETE_ORDER_BY_ORDER_ID, orderId) > 0;
    }

    public Boolean deleteOrderByVisitorAndExhibitorId(String visitorId, String exhibitorId) {
        return jdbcTemplate.update(
            SQL_DELETE_ORDER_BY_VISITOR_AND_EXHIBITOR_ID,
            visitorId,
            exhibitorId
        ) > 0;
    }
}
