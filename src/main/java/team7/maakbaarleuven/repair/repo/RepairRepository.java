package team7.maakbaarleuven.repair.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import team7.maakbaarleuven.repair.model.Repair;

public interface RepairRepository extends JpaRepository<Repair, Long> {
    public Repair findByEntryNumber(int entryNumber);

    public Repair save(Repair repair);
}
