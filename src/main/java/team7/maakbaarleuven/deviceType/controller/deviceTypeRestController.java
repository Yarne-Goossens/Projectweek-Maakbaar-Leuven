package team7.maakbaarleuven.deviceType.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import team7.maakbaarleuven.deviceType.model.deviceType;
import team7.maakbaarleuven.deviceType.service.deviceTypeService;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api/deviceTypes")
public class deviceTypeRestController {

    @Autowired
    private deviceTypeService deviceTypeService;

    @GetMapping("/overview")
    public List<deviceType> getAllDeviceTypes() {
        return deviceTypeService.getAllDeviceTypes();
    }

    @PostMapping("/add")
    public deviceType addDeviceType(@RequestBody deviceType deviceType) {
        return deviceTypeService.addDeviceType(deviceType);
    }

    
}
