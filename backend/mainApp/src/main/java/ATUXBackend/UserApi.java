package ATUXBackend;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import org.springframework.web.multipart.*;




import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.DocumentBuilder;  
import org.w3c.dom.Document;  
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;
import org.w3c.dom.Node;  
import org.w3c.dom.Element; 


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserApi {

    private UserManager users;

    @Autowired
    public UserApi(UserManager users){
        this.users = users;
    }

    @GetMapping("/users")
    public ResponseEntity<Page<Users>> getAll(int pageNumber, int pageSize, String sortBy, String sortDir){
        return users.findAll(pageNumber, pageSize, sortBy, sortDir);
    }

    @PostMapping(value= "/upload", consumes = "multipart/form-data")
    @ResponseBody
    public void uploadFile(@RequestParam("myFile") MultipartFile file){
        
        try {
			
			InputStream fileContent = file.getInputStream();
	        DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
	        DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();                 
	        Document doc = dBuilder.parse(fileContent);
			doc.getDocumentElement().normalize();
			NodeList nodeList = doc.getElementsByTagName("user"); 
			
			List<Users> listOfUsersToSave = new ArrayList<>();
			
			for (int itr = 0; itr < nodeList.getLength(); itr++)   
			{  
				Node node = nodeList.item(itr); 
				  
				if (node.getNodeType() == Node.ELEMENT_NODE)   
				{  
					Element eElement = (Element) node;
					
					listOfUsersToSave.add(new Users(0,
							eElement.getElementsByTagName("name").item(0).getTextContent(),
							eElement.getElementsByTagName("surname").item(0).getTextContent(),
							eElement.getElementsByTagName("login").item(0).getTextContent())
							);
				}  
			}
			
			users.saveAll(listOfUsersToSave);
			
		} catch (IOException | SAXException | ParserConfigurationException  e) {
			// TODO Auto-generated catch block
			e.printStackTrace();	
		}
    }   
    
    @GetMapping("/searchUser/{searchValue}/{userValueText}")
    public Page<Users> searchUser(@PathVariable String searchValue, @PathVariable String userValueText, 
    		int pageNumber, int pageSize, String sortBy, String sortDir){
    	
    	if(searchValue.equals("name")) {
    		return users.searchUserByName(userValueText,pageNumber, pageSize, sortBy, sortDir);
    	}
    	if(searchValue.equals("surname")) {
    		return users.searchUserBySurname(userValueText,pageNumber, pageSize, sortBy, sortDir);
    	}
    	else{
    		return users.searchUserByLogin(userValueText,pageNumber, pageSize, sortBy, sortDir);
    	}
    		
    }
    
    @GetMapping("/calculate/{pageSize}")
    public int calculateRows(@PathVariable int pageSize){
    	
    	int rowsInPage = pageSize;
    	long numberOfRows = users.calculate();
    	int totalPages = 0;
    	float ceiling = (float)numberOfRows/(float)rowsInPage; 	
 	
    	if((float)numberOfRows%(float)rowsInPage == 0) {
    		totalPages = (int)ceiling;	
    	}
    	if((float)numberOfRows%(float)rowsInPage != 0) {
    		totalPages = (int)ceiling+1;
    	}
    	
    	return totalPages;
    }
    
}

