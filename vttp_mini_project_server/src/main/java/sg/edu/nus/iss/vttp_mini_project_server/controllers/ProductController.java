package sg.edu.nus.iss.vttp_mini_project_server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.json.Json;
import sg.edu.nus.iss.vttp_mini_project_server.models.Product;
import sg.edu.nus.iss.vttp_mini_project_server.services.ProductService;

@RestController
@RequestMapping(path = "/api/exhibitors/{exhibitor-id}/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProductsByExhibitorId(
        @PathVariable("exhibitor-id") String exhibitorId
    ) {
        return ResponseEntity.ok(productService.getAllProductsByExhibitorId(exhibitorId));
    }

    @GetMapping(path = "/{product-id}")
    public ResponseEntity<Product> getProductById(
        @PathVariable("exhibitor-id") String exhibitorId,
        @PathVariable("product-id") String productId
    ) {
        return ResponseEntity.ok(productService.getProduct(exhibitorId, productId));
    }

    @PostMapping(
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
		produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<String> addNewProduct(
        @PathVariable("exhibitor-id") String exhibitorId,
        @RequestPart("name") String name,
        @RequestPart("price") String price,
        @RequestPart("description") String description,
        @RequestPart(name = "image", required = false) MultipartFile image
    ) {
        
        Boolean isAdded = productService.addNewProduct(
            exhibitorId,
            name,
            Float.valueOf(price),
            image,
            description);

        return ResponseEntity.ok(Json.createObjectBuilder()
            .add("isAdded", isAdded)
            .build()
            .toString());
    }

    @PutMapping(path = "/{product-id}")
    public ResponseEntity<String> updateProductById(
        @PathVariable("exhibitor-id") String exhibitorId,
        @PathVariable("product-id") String productId,
        @RequestPart("name") String name,
        @RequestPart("price") String price,
        @RequestPart("description") String description,
        @RequestPart(name = "image", required = false) MultipartFile image,
        @RequestPart(name = "imageUrl", required = false) String imageUrl
    ) {
        Boolean isUpdated = false;
        if (image != null) {
            isUpdated = productService.updateProductById(
                exhibitorId,
                productId,
                name,
                Float.valueOf(price),
                image,
                description);
        } else {
            isUpdated = productService.updateProductById(
                exhibitorId,
                productId,
                name,
                Float.valueOf(price),
                imageUrl,
                description);
        }
            
        return ResponseEntity.ok(Json.createObjectBuilder()
            .add("isUpdated", isUpdated)
            .build()
            .toString());
    }

    @DeleteMapping(path = "/{product-id}")
    public ResponseEntity<String> deleteProduct(
        @PathVariable("exhibitor-id") String exhibitorId,
        @PathVariable("product-id") String productId
    ) {
        Boolean isDeleted = productService.removeProductById(exhibitorId, productId);
        return ResponseEntity.ok(Json.createObjectBuilder()
            .add("isDeleted", isDeleted)
            .build()
            .toString());
    }
    
}
