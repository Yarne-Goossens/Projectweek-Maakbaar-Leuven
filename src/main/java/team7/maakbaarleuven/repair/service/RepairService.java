package team7.maakbaarleuven.repair.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team7.maakbaarleuven.profile.model.Profile;
import team7.maakbaarleuven.profile.repo.ProfileRepository;
import team7.maakbaarleuven.repair.model.Repair;
import team7.maakbaarleuven.repair.repo.RepairRepository;

@Service
public class RepairService {
    @Autowired
    private RepairRepository repairRepository;

    @Autowired
    private ProfileRepository profileRepository;

    public List<Repair> getAllRepairs() {
        return repairRepository.findAll();
    }

    public List<Repair> getAllRepairsByProfileId(long id) {
        return repairRepository.findRepairsByProfileId(id);
    }

    public Repair addRepair(Repair repair) {
        return repairRepository.save(repair);
    }

    public Repair changeStatus(long id, String status) {
        Repair repair = repairRepository.findById(id);

        repair.setStatus(status);
        repairRepository.save(repair);
        return repair;
    }

    public Repair deleteRepair(long id, String email) {
        if (profileRepository == null) {
            // Handle the null case, log an error, throw an exception, etc.
            throw new RuntimeException("ProfileRepository is null");
        }
        Profile profile = profileRepository.findByEmail(email);
        System.out.println(profile);
        Repair repair = repairRepository.findById(id);
        profile.removeRepair(repair);
        profileRepository.save(profile);
        repairRepository.deleteById(id);
        return repair;
    }

}
