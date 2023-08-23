package sg.edu.nus.iss.vttp_mini_project_server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.vttp_mini_project_server.models.Product;

@Repository
public class ProductRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String SQL_INSERT_NEW_PRODUCT = "INSERT INTO products VALUES (null, ?, ?, ?, ?)";
    private final String SQL_GET_PRODUCT_BY_PRODUCT_ID = "SELECT * FROM products WHERE product_id = ?";
    private final String SQL_UPDATE_PRODUCT_BY_PRODUCT_ID = "UPDATE products SET product_name = ?, price = ?, description = ? WHERE product_id = ?";
    private final String SQL_DELETE_PRODUCT_BY_PRODUCT_ID = "DELETE FROM products WHERE product_id = ?";

    public Boolean insertNewProduct(Integer exhibitorId, String productName, Float price, String description) {
        return jdbcTemplate.update(SQL_INSERT_NEW_PRODUCT, exhibitorId, productName, price, description) > 0;
    }

    public Product getProduct(Integer productId) {
        return jdbcTemplate.queryForObject(SQL_GET_PRODUCT_BY_PRODUCT_ID, BeanPropertyRowMapper.newInstance(Product.class), productId);
    }

    public Boolean updateProduct(Integer productId, String productName, Float price, String description) {
        return jdbcTemplate.update(SQL_UPDATE_PRODUCT_BY_PRODUCT_ID, productName, price, description, productId) > 0;
    }

    public Boolean deleteProduct(Integer productId) {
        return jdbcTemplate.update(SQL_DELETE_PRODUCT_BY_PRODUCT_ID, productId) > 0;
    }
    
}
