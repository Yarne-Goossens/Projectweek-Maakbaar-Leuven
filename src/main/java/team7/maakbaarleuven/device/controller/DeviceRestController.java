package team7.maakbaarleuven.device.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team7.maakbaarleuven.device.model.Device;
import team7.maakbaarleuven.device.service.DeviceService;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api/devices")
public class DeviceRestController {

    @Autowired
    private DeviceService deviceService;

    @GetMapping("/overview")
    public List<Device> getAllDevices() {
        return deviceService.getAllDevices();
    }

    @GetMapping("/{id}")
    public Device getDeviceById(@PathVariable("id") long id) {
        return deviceService.getDeviceById(id);
    }

    @GetMapping("/{deviceModelNumber}")
    public Device getDeviceByModelNumber(@PathVariable("deviceModelNumber") String deviceModelNumber) {
        return deviceService.getDeviceByModelNumber(deviceModelNumber);
    }

    @PostMapping("/add")
    public Device addDevice(@RequestBody Device device) {
        return deviceService.addDevice(device);

    }

    @GetMapping("/overview/{profileId}")
    public List<Device> getAllDevicesByProfileId(@PathVariable("profileId") long id) {
        // System.out.println(deviceService.getAllDevicesByProfileId(id));
        return deviceService.getAllDevicesByProfileId(id);
    }
}