package team7.maakbaarleuven.repair.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import team7.maakbaarleuven.repair.model.Repair;
import team7.maakbaarleuven.repair.service.RepairService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/repairs")

public class RepairRestController {
    @Autowired
    private RepairService repairService;
    
    @GetMapping("/overview")
    public List<Repair> getAllRepairs(){
        return repairService.getAllRepairs();
    }

    @PostMapping("/add")
    public Repair addRepair(@RequestBody Repair repair){
        return repairService.addRepair(repair);
    }
}
