package sg.edu.nus.iss.vttp_mini_project_server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sg.edu.nus.iss.vttp_mini_project_server.dtos.NewProductDTO;
import sg.edu.nus.iss.vttp_mini_project_server.models.Product;
import sg.edu.nus.iss.vttp_mini_project_server.services.ProductService;

@RestController
@CrossOrigin
@RequestMapping(path = "/api/exhibitors/{exhibitor-id}/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProductsByExhibitorId(@PathVariable("exhibitor-id") Integer exhibitorId) {
        return ResponseEntity.ok(productService.getAllProductsByExhibitorId(exhibitorId));
    }

    @GetMapping(path = "/{product-id}")
    public ResponseEntity<Product> getProductById(@PathVariable("exhibitor-id") Integer exhibitorId, @PathVariable("product-id") Integer productId) {
        return ResponseEntity.ok(productService.getProduct(exhibitorId, productId));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> addNewProduct(@PathVariable("exhibitor-id") Integer exhibitorId, @RequestBody NewProductDTO dto) {
        return ResponseEntity.ok(productService.addNewProduct(exhibitorId, dto.getProductName(), dto.getPrice(), dto.getDescription()));
    }

    @PutMapping(path = "/{product-id}")
    public ResponseEntity<Boolean> updateProductById(@PathVariable("exhibitor-id") Integer exhibitorId, @PathVariable("product-id") Integer productId, @RequestBody NewProductDTO dto) {
        return ResponseEntity.ok(productService.updateProductById(exhibitorId, productId, dto.getProductName(), dto.getPrice(), dto.getDescription()));
    }

    @DeleteMapping(path = "/{product-id}")
    public ResponseEntity<Boolean> deleteProduct(@PathVariable("exhibitor-id") Integer exhibitorId, @PathVariable("product-id") Integer productId) {
        return ResponseEntity.ok(productService.removeProductById(exhibitorId, productId));
    }
    
}
