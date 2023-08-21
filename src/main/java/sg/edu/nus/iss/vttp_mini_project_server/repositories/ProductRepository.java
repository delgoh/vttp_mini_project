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

    private final String INSERT_NEW_PRODUCT_SQL = "INSERT INTO products VALUES (null, ?, ?, ?, ?)";
    private final String GET_PRODUCT_BY_PRODUCT_ID_SQL = "SELECT * FROM products WHERE product_id = ?";
    private final String UPDATE_PRODUCT_BY_PRODUCT_ID_SQL = "UPDATE products SET product_name = ?, price = ?, description = ? WHERE product_id = ?";
    private final String DELETE_PRODUCT_BY_PRODUCT_ID_SQL = "DELETE FROM products WHERE product_id = ?";

    public Boolean insertNewProduct(Integer exhibitorId, String productName, Float price, String description) {
        return jdbcTemplate.update(INSERT_NEW_PRODUCT_SQL, exhibitorId, productName, price, description) > 0;
    }

    public Product getProduct(Integer productId) {
        return jdbcTemplate.queryForObject(GET_PRODUCT_BY_PRODUCT_ID_SQL, BeanPropertyRowMapper.newInstance(Product.class), productId);
    }

    public Boolean updateProduct(Integer productId, String productName, Float price, String description) {
        return jdbcTemplate.update(UPDATE_PRODUCT_BY_PRODUCT_ID_SQL, productName, price, description, productId) > 0;
    }

    public Boolean deleteProduct(Integer productId) {
        return jdbcTemplate.update(DELETE_PRODUCT_BY_PRODUCT_ID_SQL, productId) > 0;
    }
    
}
