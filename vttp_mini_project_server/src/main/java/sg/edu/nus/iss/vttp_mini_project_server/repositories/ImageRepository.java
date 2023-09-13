package sg.edu.nus.iss.vttp_mini_project_server.repositories;

import java.io.InputStream;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Repository
public class ImageRepository {

    @Autowired
	private AmazonS3 s3;

    @Value("${s3.bucket.name}")
    private String s3BucketName;

	public String uploadImage(String contentType, InputStream is, long contentLength) {
		String id = UUID.randomUUID().toString().substring(0, 8);
		String key = "%s".formatted(id);

		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentType(contentType);
		metadata.setContentLength(contentLength);

		PutObjectRequest putReq = new PutObjectRequest(s3BucketName, key, is, metadata);
		putReq = putReq.withCannedAcl(CannedAccessControlList.PublicRead);

		s3.putObject(putReq);
		return s3.getUrl(s3BucketName, key).toExternalForm();
        
	}
}
