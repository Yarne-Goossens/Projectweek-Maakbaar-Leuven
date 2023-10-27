package team7.maakbaarleuven.profile.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/add")
    public Profile addProfile(@RequestBody Profile profile) {
        return profileService.addProfile(profile);
    }

    @DeleteMapping("/delete/")
    public Profile deleteProfile(Profile profile) {
        return profileService.deleteProfile(profile);
    }
}
