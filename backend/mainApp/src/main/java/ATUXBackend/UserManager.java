package ATUXBackend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class UserManager {

    private UserRepo userRepo;

    @Autowired
    public UserManager(UserRepo userRepo){
        this.userRepo = userRepo;
    }

    public ResponseEntity<Page<Users>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir){	
        return new ResponseEntity<>(userRepo.findAll(
            PageRequest.of(
                pageNumber, pageSize,
                sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
            )
        ), HttpStatus.OK);
    }

    public List<Users> saveAll(List<Users> users){
        return userRepo.saveAll(users);
    }
            
    public Page<Users> searchUserByName(String value, int pageNumber, int pageSize, String sortBy, String sortDir) { 	
    	return userRepo.findByName(value, PageRequest.of(
                pageNumber, pageSize,
                sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
            )); 	
    }
    
    public Page<Users> searchUserBySurname(String value, int pageNumber, int pageSize, String sortBy, String sortDir) {
    	return userRepo.findBySurname(value, PageRequest.of(
                pageNumber, pageSize,
                sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
            ));
    }
    
    public Page<Users> searchUserByLogin(String value, int pageNumber, int pageSize, String sortBy, String sortDir) {
    	return userRepo.findByLogin(value, PageRequest.of(
                pageNumber, pageSize,
                sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
            ));
    }
    
    public long calculate(){
        return userRepo.count();
    } 

}

