package team7.maakbaarleuven.device.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import team7.maakbaarleuven.device.model.Device;

public interface DeviceRepository extends JpaRepository<Device, Long> {
    public Device findByDeviceModelNumber(String deviceModelNumber);

    public Device findById(long id);

    public Device findDeviceByDeviceModelNumber(String deviceModelNumber);

    public List<Device> findDevicesByProfileId(long id);
}
