package sg.edu.nus.iss.vttp_mini_project_server.services;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import sg.edu.nus.iss.vttp_mini_project_server.exceptions.InvalidProductExhibitorException;
import sg.edu.nus.iss.vttp_mini_project_server.exceptions.ProductNotFoundException;
import sg.edu.nus.iss.vttp_mini_project_server.models.Product;
import sg.edu.nus.iss.vttp_mini_project_server.repositories.ImageRepository;
import sg.edu.nus.iss.vttp_mini_project_server.repositories.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ExhibitorService exhibitorService;

    public Boolean addNewProduct(
        String exhibitorId,
        String name,
        Float price,
        // String imageUrl,
        MultipartFile image,
        String description
    ) {
        exhibitorService.checkExhibitorIdExists(exhibitorId);

        String imageUrl = "";
        if (image != null) {
            try {
                imageUrl = imageRepository.uploadImage(
                    image.getContentType(),
                    image.getInputStream(),
                    image.getSize());
            } catch (IOException ex) {
                System.out.println(">> Please handle this error");
            }
        }
        
        return productRepository.insertNewProduct(
            UUID.randomUUID().toString(),
            exhibitorId,
            name,
            price,
            imageUrl,
            description);
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
                "Product with ID %s not found.".formatted(productId));
        }
        Product product = productOpt.get();
        if (!product.getExhibitorId().equals(exhibitorId)) {
            throw new InvalidProductExhibitorException(
                "Product with ID %s does not belong to Exhibitor with ID %s."
                    .formatted(productId, exhibitorId));
        }
        return product;
    }

    public Product getProductById(String productId) {
        Optional<Product> productOpt = productRepository.getProductById(productId);
        if (productOpt.isEmpty()) {
            throw new ProductNotFoundException(
                "Product with ID %s not found.".formatted(productId));
        }
        return productOpt.get();
    }

    public void checkProductIdExists(String productId) {
        Optional<Product> productOpt = productRepository.getProductById(productId);
        if (productOpt.isEmpty()) {
            throw new ProductNotFoundException(
                "Product with ID %s not found.".formatted(productId));
        }
    }

    // overloaded method, takes in image multipartfile
    public Boolean updateProductById(
        String exhibitorId,
        String productId,
        String name,
        Float price,
        MultipartFile image,
        String description
    ) {
        exhibitorService.checkExhibitorIdExists(exhibitorId);
        this.checkProductIdExists(productId);
        System.out.println("check is correct");

        String imageUrl = "";
        try {
            imageUrl = imageRepository.uploadImage(
                image.getContentType(),
                image.getInputStream(),
                image.getSize());
        } catch (IOException ex) {
            System.out.println(">> Please handle this error");
        }
        System.out.println("uploading product...");

        return productRepository.updateProductById(productId, name, price, imageUrl, description);
    }

    // overloaded method, takes in imageUrl
    public Boolean updateProductById(
        String exhibitorId,
        String productId,
        String name,
        Float price,
        String imageUrl,
        String description
    ) {
        exhibitorService.checkExhibitorIdExists(exhibitorId);
        this.checkProductIdExists(productId);
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
