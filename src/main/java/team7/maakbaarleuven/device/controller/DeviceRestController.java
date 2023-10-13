package team7.maakbaarleuven.device.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import team7.maakbaarleuven.device.model.Device;
import team7.maakbaarleuven.device.service.DeviceService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class DeviceRestController {
    
        @Autowired
        private DeviceService deviceService;
    
        @RequestMapping("/devices")
        public List<Device> getAllDevices() {
            return deviceService.getAllDevices();
        }
        
        
    

}
