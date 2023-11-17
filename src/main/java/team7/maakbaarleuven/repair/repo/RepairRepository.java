package team7.maakbaarleuven.repair.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import team7.maakbaarleuven.repair.model.Repair;

public interface RepairRepository extends JpaRepository<Repair, Long> {
    public Repair findByEntryNumber(int entryNumber);

    public List<Repair> findRepairsByProfileId(long id);
}
