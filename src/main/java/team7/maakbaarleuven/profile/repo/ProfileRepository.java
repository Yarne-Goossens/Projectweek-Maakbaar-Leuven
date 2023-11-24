package team7.maakbaarleuven.profile.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import team7.maakbaarleuven.profile.model.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Profile deleteByEmail(String email);

    Profile findByEmail(String email);

    Profile findById(long id);
}
