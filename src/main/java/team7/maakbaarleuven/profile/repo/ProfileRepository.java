package team7.maakbaarleuven.profile.repo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import team7.maakbaarleuven.profile.model.Profile;
public interface ProfileRepository extends JpaRepository<Profile,Long> {

}
