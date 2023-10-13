package team7.maakbaarleuven.device.service;
import java.util.List;

import org.springframework.stereotype.Service;

import team7.maakbaarleuven.device.model.Device;

@Service
public class DeviceService {

    private List<Device> devices;


    public List<Device> getAllDevices() {
        return this.devices;
    }

    public Device getDevice(int deviceModelNumber) {
        return this.devices.get(deviceModelNumber);
    }

    public void addDevice(Device device) {
        this.devices.add(device);
    }

    public void updateDevice(Device device) {
        this.devices.set(device.getDeviceModelNumber(), device);
    }





    
}
