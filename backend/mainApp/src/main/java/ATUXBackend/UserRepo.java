package ATUXBackend;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepo extends JpaRepository<Users, Integer>, CrudRepository<Users, Integer> {
		
	public Page<Users> findByName(String value, Pageable pageable);
	public Page<Users> findBySurname(String value, Pageable pageable);
	public Page<Users> findByLogin(String value, Pageable pageable);

}