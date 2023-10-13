package team7.maakbaarleuven.profile.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import team7.maakbaarleuven.profile.service.ProfileService;

public class ProfileRestController {
    
    @Autowired
    private ProfileService profileService;

    @GetMapping("/overview")
}
