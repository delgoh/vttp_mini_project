package sg.edu.nus.iss.vttp_mini_project_server.services;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sg.edu.nus.iss.vttp_mini_project_server.dtos.NewOrderDto;
import sg.edu.nus.iss.vttp_mini_project_server.models.Order;
import sg.edu.nus.iss.vttp_mini_project_server.repositories.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ExhibitorService exhibitorService;

    @Autowired
    private VisitorService visitorService;

    @Autowired
    private ProductService productService;

    public Boolean addNewOrder(String visitorId, String exhibitorId, NewOrderDto newOrder) {
        visitorService.checkVisitorIdExists(visitorId);
        exhibitorService.checkExhibitorIdExists(exhibitorId);
        return orderRepository.insertNewOrder(
            UUID.randomUUID().toString(),
            visitorId,
            exhibitorId,
            newOrder.getProductId(),
            newOrder.getQuantity(),
            new Timestamp(new Date().getTime()),
            "PENDING"
        );
    }

    public List<Order> getVisitorPendingOrders(String visitorId) {
        List<Order> orders = orderRepository.getVisitorPendingOrders(visitorId);
        for (Order order : orders) {
            String productName = productService.getProductNameById(order.getProductId());
            order.setProductName(productName);
        }
        return orders;
    }

    public Boolean deleteOrderById(String orderId) {
        return orderRepository.deleteOrderById(orderId);
    }

    public Boolean deleteOrderByCart(String visitorId, String exhibitorId) {
        return orderRepository.deleteOrderByVisitorAndExhibitorId(visitorId, exhibitorId);
    }
}
