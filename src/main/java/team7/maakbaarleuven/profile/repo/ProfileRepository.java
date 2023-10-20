package team7.maakbaarleuven.profile.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import team7.maakbaarleuven.profile.model.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Profile deleteByEmail(String email);

    Profile findByEmail(String email);

}
