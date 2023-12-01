package team7.maakbaarleuven.profile.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import team7.maakbaarleuven.profile.model.Profile;
import team7.maakbaarleuven.profile.repo.ProfileRepository;
import team7.maakbaarleuven.repair.model.Repair;
import team7.maakbaarleuven.repair.repo.RepairRepository;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private RepairRepository repairRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    public Profile addProfile(Profile profile) {
        profile.setPassword(new BCryptPasswordEncoder().encode(profile.getPassword()));
        return profileRepository.save(profile);
    }

    public Profile deleteProfile(Profile profile) {
        Profile deletedProfile = profileRepository.deleteByEmail(profile.getEmail());
        profileRepository.delete(profile);
        return deletedProfile;
    }

    public Profile getProfileByEmail(String email) {
        return profileRepository.findByEmail(email);
    }

    public boolean authenticate(Profile profile, String password) {
        if (profile != null) {
            return passwordEncoder.matches(password, profile.getPassword());
        }

        return false; // Email not found in the database.
    }

    public void updateProfile(Profile profile) {
        profileRepository.save(profile);
    }

    public Profile addRepair(long id, Repair repair) {
        Profile profile = profileRepository.findById(id);
        profile.addRepair(repair);
        repair.setProfile(profile);
        repairRepository.save(repair);
        profileRepository.save(profile);

        return profile;
    }
}