package sg.edu.nus.iss.vttp_mini_project_server.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sg.edu.nus.iss.vttp_mini_project_server.exceptions.InvalidProductExhibitorException;
import sg.edu.nus.iss.vttp_mini_project_server.exceptions.ProductNotFoundException;
import sg.edu.nus.iss.vttp_mini_project_server.models.Product;
import sg.edu.nus.iss.vttp_mini_project_server.repositories.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ExhibitorService exhibitorService;

    public Boolean addNewProduct(Integer exhibitorId, String name, Float price, String imageUrl, String description) {
        exhibitorService.checkExhibitorIdExists(exhibitorId);
        return productRepository.insertNewProduct(exhibitorId, name, price, imageUrl, description);
    }

    public List<Product> getAllProductsByExhibitorId(Integer exhibitorId) {
        exhibitorService.checkExhibitorIdExists(exhibitorId);
        return productRepository.getAllProductsByExhibitorId(exhibitorId);
    }

    public Product getProduct(Integer exhibitorId, Integer productId) {
        exhibitorService.checkExhibitorIdExists(exhibitorId);
        Optional<Product> productOpt = productRepository.getProductById(productId);
        if (productOpt.isEmpty()) {
            throw new ProductNotFoundException("Product with ID %s not found.".formatted(productId.toString()));
        }
        Product product = productOpt.get();
        if (product.getExhibitorId() != exhibitorId) {
            throw new InvalidProductExhibitorException("Product with ID %s does not belong to Exhibitor with ID %s.".formatted(productId.toString(), exhibitorId.toString()));
        }
        return product;
    }

    public Boolean updateProductById(Integer exhibitorId, Integer productId, String name, Float price, String imageUrl, String description) {
        exhibitorService.checkExhibitorIdExists(exhibitorId);
        Optional<Product> productOpt = productRepository.getProductById(productId);
        if (productOpt.isEmpty()) {
            throw new ProductNotFoundException("Product with ID %s not found.".formatted(productId.toString()));
        }
        Product productToUpdate = productOpt.get();
        if (productToUpdate.getExhibitorId() != exhibitorId) {
            throw new InvalidProductExhibitorException("Product with ID %s does not belong to Exhibitor with ID %s.".formatted(productId.toString(), exhibitorId.toString()));
        }
        productToUpdate.setName(name);
        productToUpdate.setPrice(price);
        productToUpdate.setImageUrl(imageUrl);
        productToUpdate.setDescription(description);
        return productRepository.updateProductById(productId, name, price, imageUrl, description);
    } 

    public Boolean removeProductById(Integer exhibitorId, Integer productId) {
        exhibitorService.checkExhibitorIdExists(exhibitorId);
        Optional<Product> productOpt = productRepository.getProductById(productId);
        if (productOpt.isEmpty()) {
            throw new ProductNotFoundException("Product with ID %s not found.".formatted(productId.toString()));
        }
        Product product = productOpt.get();
        if (product.getExhibitorId() != exhibitorId) {
            throw new InvalidProductExhibitorException("Product with ID %s does not belong to Exhibitor with ID %s.".formatted(productId.toString(), exhibitorId.toString()));
        }
        return productRepository.deleteProductById(productId);
    }

    // public Boolean removeAllProductsByExhibitorId(Integer exhibitorId) {
    //     return productRepository.deleteAllProductsByExhibitorId(exhibitorId);
    // }
    
}
