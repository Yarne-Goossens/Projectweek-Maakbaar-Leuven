package team7.maakbaarleuven.device.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team7.maakbaarleuven.device.model.Device;
import team7.maakbaarleuven.device.repo.DeviceRepository;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    public Device getDevice(int deviceModelNumber) {
        return deviceRepository.findByDeviceModelNumber(deviceModelNumber);
    }

    public Device addDevice(Device device) {
        return deviceRepository.save(device);
    }
}