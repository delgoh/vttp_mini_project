package sg.edu.nus.iss.vttp_mini_project_server.services;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

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

    public Boolean addNewOrder(Integer visitorId, Integer exhibitorId, NewOrderDto newOrder) {
        visitorService.checkVisitorIdExists(visitorId);
        exhibitorService.checkExhibitorIdExists(exhibitorId);
        return orderRepository.insertNewOrder(visitorId, exhibitorId, newOrder.getProductId(), newOrder.getQuantity(), new Timestamp(new Date().getTime()), "PENDING");
    }

    public List<Order> getVisitorOrders(Integer visitorId) {
        return orderRepository.getVisitorOrders(visitorId);
    }

    public Boolean deleteOrderById(Integer orderId) {
        return orderRepository.deleteOrderById(orderId);
    }

    public Boolean deleteOrderByCart(Integer visitorId, Integer exhibitorId) {
        return orderRepository.deleteOrderByVisitorAndExhibitorId(visitorId, exhibitorId);
    }
}
