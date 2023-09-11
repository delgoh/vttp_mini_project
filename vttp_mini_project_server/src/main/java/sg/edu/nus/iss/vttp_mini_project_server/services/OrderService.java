package sg.edu.nus.iss.vttp_mini_project_server.services;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sg.edu.nus.iss.vttp_mini_project_server.dtos.NewOrderDto;
import sg.edu.nus.iss.vttp_mini_project_server.exceptions.UpdateOrdersFailedException;
import sg.edu.nus.iss.vttp_mini_project_server.models.Order;
import sg.edu.nus.iss.vttp_mini_project_server.models.Product;
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

    public List<Order> getVisitorOrdersByStatus(String visitorId, String orderStatus) {
        List<Order> orders = orderRepository.getVisitorOrdersByStatus(visitorId, orderStatus);
        for (Order order : orders) {
            Product product = productService.getProductById(order.getProductId());
            order.setProductName(product.getName());
            order.setUnitPrice(product.getPrice());
        }
        return orders;
    }

    @Transactional(rollbackFor = UpdateOrdersFailedException.class)
    public Boolean markOrdersAsPaid(List<String> orderIds) {
        for (String orderId : orderIds) {
            if (!orderRepository.updateOrderStatusById(orderId, "PAID")) {
                throw new UpdateOrdersFailedException(
                    "Failed to update order status for one or more orders."
                );
            }
        }
        return true;
    }

    public Boolean deleteOrderById(String orderId) {
        if (!orderRepository.checkOrderIsPending(orderId)) {
            return false;
        }
        return orderRepository.deleteOrderById(orderId);
    }

    public Boolean deleteOrderByCart(String visitorId, String exhibitorId) {
        return orderRepository.deleteOrderByVisitorAndExhibitorId(visitorId, exhibitorId);
    }
}
