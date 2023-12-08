package team7.maakbaarleuven.deviceType.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import team7.maakbaarleuven.deviceType.model.deviceType;
import team7.maakbaarleuven.deviceType.repo.deviceTypeRepository;
import jakarta.persistence.Access;

@Service
public class deviceTypeService {
    @Autowired
    private deviceTypeRepository deviceTypeRepository;

    public deviceType addDeviceType(deviceType deviceType) {
        return deviceTypeRepository.save(deviceType);
    }

    public deviceType getDeviceTypeById(long id) {
        return deviceTypeRepository.findById(id);
    }

    public List<deviceType> getAllDeviceTypes() {
        return deviceTypeRepository.findAll();
    }
    
}
