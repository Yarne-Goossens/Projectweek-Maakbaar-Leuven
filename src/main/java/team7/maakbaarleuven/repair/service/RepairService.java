package team7.maakbaarleuven.repair.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team7.maakbaarleuven.repair.model.Repair;
import team7.maakbaarleuven.repair.repo.RepairRepository;

@Service
public class RepairService {
    @Autowired
    private RepairRepository repairRepository;

    public List<Repair> getAllRepairs() {
        return repairRepository.findAll();
    }

    public List<Repair> getAllRepairsByProfileId(long id) {
        return repairRepository.findRepairsByProfileId(id);
    }

    public Repair addRepair(Repair repair) {
        return repairRepository.save(repair);
    }

}
