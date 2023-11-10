package team7.maakbaarleuven.profile.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.micrometer.core.ipc.http.HttpSender.Response;
import team7.maakbaarleuven.profile.model.Profile;
import team7.maakbaarleuven.profile.service.ProfileService;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/api/profile")
public class ProfileRestController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/overview")
    public List<Profile> getAllProfiles() {
        return profileService.getAllProfiles();
    }

    @GetMapping("/{email}")
    public Profile getProfileByEmail(@PathVariable("email") String email) {
        return profileService.getProfileByEmail(email);
    }

    @PostMapping("/add")
    public Profile addProfile(@RequestBody Profile profile) {
        return profileService.addProfile(profile);
    }

    @DeleteMapping("/delete/")
    public Profile deleteProfile(Profile profile) {
        return profileService.deleteProfile(profile);
    }

    @PostMapping("/authenticate")
    public Boolean authenticateProfile(@RequestBody Profile request) {
        System.out.println(request.getPassword());
        Profile profile = profileService.getProfileByEmail(request.getEmail());
        String password = request.getPassword();
        System.out.println(request.getEmail());

        if (profileService.authenticate(profile, password)) {
            System.out.println("gelukt");
            return true;
        } else {
            System.out.println("mislukt");
            return false;
        }
    }

}

//Reverting commits
