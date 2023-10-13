package team7.maakbaarleuven.device.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import team7.maakbaarleuven.device.model.Device;
import team7.maakbaarleuven.device.service.DeviceService;

@CrossOrigin(origins = "http://localhost:5500")
@RestController
@RequestMapping("/api/devices")
public class DeviceRestController {
    
        @Autowired
        private DeviceService deviceService;
    
        @GetMapping
        public List<Device> getAllDevices() {
            return deviceService.getAllDevices();
        }
        @PostMapping("/add")
        public Device addDevice(@RequestBody Device device){
            return deviceService.addDevice(device);
            
        }
        
        
    

}
