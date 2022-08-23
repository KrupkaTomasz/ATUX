package creatingXML;

import java.io.File;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
 
public class CreateXMLFileJava {
 
    public static final String xmlFilePath = "C:\\Users\\Densetsu\\Desktop\\xmlfile_ATUX.xml";
 
    public static void main(String argv[]) {
 
        try {
 
            DocumentBuilderFactory documentFactory = DocumentBuilderFactory.newInstance();
 
            DocumentBuilder documentBuilder = documentFactory.newDocumentBuilder();
 
            Document document = documentBuilder.newDocument();
 
            // root element
            Element users = document.createElement("users");
            document.appendChild(users);
            
            
            for(int i=1; i<=50001; i++) {
            	
	            String s = String.valueOf(i);
	            	
	            // user element
	            Element user = document.createElement("user");
	 
	            users.appendChild(user);
	 
	            // name element
	            Element name = document.createElement("name");
	            name.appendChild(document.createTextNode("name"+s));
	            user.appendChild(name);
	 
	            // surname element
	            Element surname = document.createElement("surname");
	            surname.appendChild(document.createTextNode("surname"+s));
	            user.appendChild(surname);
	 
	            // login element
	            Element login = document.createElement("login");
	            login.appendChild(document.createTextNode("login"+s));
	            user.appendChild(login);
            
            }
            
 
 
            // create the xml file
            //transform the DOM Object to an XML File
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource domSource = new DOMSource(document);
            StreamResult streamResult = new StreamResult(new File(xmlFilePath));
 
            // If you use
            // StreamResult result = new StreamResult(System.out);
            // the output will be pushed to the standard output ...
            // You can use that for debugging 
 
            transformer.transform(domSource, streamResult);
 
            System.out.println("Done creating XML File");
 
        } catch (ParserConfigurationException pce) {
            pce.printStackTrace();
        } catch (TransformerException tfe) {
            tfe.printStackTrace();
        }
    }
}
