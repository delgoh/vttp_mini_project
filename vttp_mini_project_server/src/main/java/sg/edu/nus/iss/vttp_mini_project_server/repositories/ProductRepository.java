package sg.edu.nus.iss.vttp_mini_project_server.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.vttp_mini_project_server.models.Product;

@Repository
public class ProductRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String SQL_INSERT_NEW_PRODUCT =
        "INSERT INTO products VALUES (?, ?, ?, ?, ?, ?)";
    private final String SQL_GET_ALL_PRODUCTS_BY_EXHIBITOR_ID =
        "SELECT * FROM products WHERE exhibitor_id = ?";
    private final String SQL_GET_PRODUCT_BY_PRODUCT_ID =
        "SELECT * FROM products WHERE product_id = ?";
    // private final String SQL_GET_PRODUCT_NAME_BY_PRODUCT_ID =
    //     "SELECT name FROM products WHERE product_id = ?";
    private final String SQL_GET_EXHIBITOR_ID_BY_PRODUCT_ID =
        "SELECT exhibitor_id from products where product_id = ?";
    private final String SQL_UPDATE_PRODUCT_BY_PRODUCT_ID =
        "UPDATE products SET name = ?, price = ?, image_url = ?, description = ? WHERE product_id = ?";
    private final String SQL_DELETE_PRODUCT_BY_PRODUCT_ID =
        "DELETE FROM products WHERE product_id = ?";
    // private final String SQL_DELETE_ALL_PRODUCTS_BY_EXHIBITOR_ID =
        // "DELETE FROM products WHERE exhibitor_id = ?";

    public Boolean insertNewProduct(
        String newId,
        String exhibitorId,
        String name,
        Float price,
        String imageUrl,
        String description
    ) {
        return jdbcTemplate.update(
            SQL_INSERT_NEW_PRODUCT,
            newId,
            exhibitorId,
            name,
            price,
            imageUrl,
            description
        ) > 0;
    }

    public List<Product> getAllProductsByExhibitorId(String exhibitorId) {
        return jdbcTemplate.query(
            SQL_GET_ALL_PRODUCTS_BY_EXHIBITOR_ID,
            BeanPropertyRowMapper.newInstance(Product.class),
            exhibitorId
        );
    }

    public Optional<Product> getProductById(String productId) {
        List<Product> result = jdbcTemplate.query(
            SQL_GET_PRODUCT_BY_PRODUCT_ID,
            BeanPropertyRowMapper.newInstance(Product.class),
            productId
        );
        
        if (result.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(result.get(0));
        }
    }

    // public String getProductNameById(String productId) {
    //     return jdbcTemplate.queryForObject(
    //         SQL_GET_PRODUCT_NAME_BY_PRODUCT_ID, 
    //         String.class,
    //         productId
    //     );
    // }

    public String getExhibitorIdByProductId(String productId) {
        return jdbcTemplate.queryForObject(
            SQL_GET_EXHIBITOR_ID_BY_PRODUCT_ID, 
            String.class,
            productId
        );
    }

    public Boolean updateProductById(
        String productId,
        String name,
        Float price,
        String imageUrl,
        String description
    ) {
        return jdbcTemplate.update(
            SQL_UPDATE_PRODUCT_BY_PRODUCT_ID,
            name,
            price,
            imageUrl,
            description,
            productId
        ) > 0;
    }

    public Boolean deleteProductById(String productId) {
        return jdbcTemplate.update(SQL_DELETE_PRODUCT_BY_PRODUCT_ID, productId) > 0;
    }

    // public Boolean deleteAllProductsByExhibitorId(String exhibitorId) {
    //     return jdbcTemplate.update(SQL_DELETE_ALL_PRODUCTS_BY_EXHIBITOR_ID, exhibitorId) > 0;
    // }
    
}
