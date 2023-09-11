package sg.edu.nus.iss.vttp_mini_project_server.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    public Boolean addNewProduct(
        String exhibitorId,
        String name,
        Float price,
        String imageUrl,
        String description
    ) {
        exhibitorService.checkExhibitorIdExists(exhibitorId);
        return productRepository.insertNewProduct(
            UUID.randomUUID().toString(),
            exhibitorId,
            name,
            price,
            imageUrl,
            description
        );
    }

    public List<Product> getAllProductsByExhibitorId(String exhibitorId) {
        exhibitorService.checkExhibitorIdExists(exhibitorId);
        return productRepository.getAllProductsByExhibitorId(exhibitorId);
    }

    public Product getProduct(String exhibitorId, String productId) {
        exhibitorService.checkExhibitorIdExists(exhibitorId);
        Optional<Product> productOpt = productRepository.getProductById(productId);
        if (productOpt.isEmpty()) {
            throw new ProductNotFoundException(
                "Product with ID %s not found.".formatted(productId)
            );
        }
        Product product = productOpt.get();
        if (!product.getExhibitorId().equals(exhibitorId)) {
            throw new InvalidProductExhibitorException(
                "Product with ID %s does not belong to Exhibitor with ID %s."
                    .formatted(productId, exhibitorId)
            );
        }
        return product;
    }

    public Product getProductById(String productId) {
        Optional<Product> productOpt = productRepository.getProductById(productId);
        if (productOpt.isEmpty()) {
            throw new ProductNotFoundException(
                "Product with ID %s not found.".formatted(productId)
            );
        }
        return productOpt.get();
    }

    // public String getProductNamePriceById(String productId) {
    //     return productRepository.getProductNamePriceById(productId);
    // }

    public Boolean updateProductById(
        String exhibitorId,
        String productId,
        String name,
        Float price,
        String imageUrl,
        String description
    ) {
        exhibitorService.checkExhibitorIdExists(exhibitorId);
        Product productToUpdate = this.getProduct(exhibitorId, productId);

        productToUpdate.setName(name);
        productToUpdate.setPrice(price);
        productToUpdate.setImageUrl(imageUrl);
        productToUpdate.setDescription(description);

        return productRepository.updateProductById(productId, name, price, imageUrl, description);
    } 

    public Boolean removeProductById(String exhibitorId, String productId) {
        exhibitorService.checkExhibitorIdExists(exhibitorId);
        return productRepository.deleteProductById(productId);
    }

    // public Boolean removeAllProductsByExhibitorId(String exhibitorId) {
    //     return productRepository.deleteAllProductsByExhibitorId(exhibitorId);
    // }
    
}
