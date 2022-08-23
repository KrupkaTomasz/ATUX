package ATUXBackend;

import javax.persistence.*;

@Entity
public class Users{
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String surname;
    private String login;
    
    public Users(){
    }
    
    public Users(int id, String firstNameConst, String surnameConst, String loginConst) {
        this.id = id;
        this.name = firstNameConst;
        this.surname = surnameConst;
        this.login = loginConst;
    }
    
    public int getId() {
        return id;
    }

    public void setId(int idSet) {
        id = idSet;
    }

    public String getName() {
        return name;
    }

    public void setName(String nameSet) {
    	name = nameSet;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surnameSet) {
        surname = surnameSet;
    }

    public String getLogin() {
        return login;
    }

    public void setPESEL(String loginSet) {
        this.login = loginSet;
    }

}
