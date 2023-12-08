package team7.maakbaarleuven.deviceType.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import team7.maakbaarleuven.deviceType.model.deviceType;

public interface deviceTypeRepository extends JpaRepository<deviceType, Long>{
    public deviceType findByDeviceType(String deviceType);

    public deviceType findById(long id);

    public void deleteById(long id);

    

    
}
