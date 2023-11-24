package team7.maakbaarleuven.profile.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import team7.maakbaarleuven.profile.model.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Profile deleteByEmail(String email);

    Profile findByEmail(String email);

    Profile findById(long id);

    @Query("SELECT r.profile.id FROM Repair r WHERE r.id = :repairId")
    long findProfileIdByRepairId(@Param("repairId") long repairId);
}
