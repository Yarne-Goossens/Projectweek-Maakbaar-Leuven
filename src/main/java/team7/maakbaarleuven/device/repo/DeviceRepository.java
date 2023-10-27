package team7.maakbaarleuven.device.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import team7.maakbaarleuven.device.model.Device;

public interface DeviceRepository extends JpaRepository<Device, Long> {
    public Device findByDeviceModelNumber(int deviceModelNumber);

}
