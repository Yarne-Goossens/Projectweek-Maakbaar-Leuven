package team7.maakbaarleuven.profile.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team7.maakbaarleuven.profile.model.Profile;
import team7.maakbaarleuven.profile.repo.ProfileRepository;
@Service
public class ProfileService {

    @Autowired 
    private ProfileRepository profileRepository;

    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

	public Profile addProfile(Profile profile) {
        return profileRepository.save(profile);
	}

    public Profile deleteProfile(Profile profile) {
        Profile deletedProfile = profileRepository.deleteByEmail(profile.getEmail());
        profileRepository.delete(profile);
        return deletedProfile;
    
    }
    
}
