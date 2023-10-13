package team7.maakbaarleuven.analyseTree.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team7.maakbaarleuven.analyseTree.model.AnalyseTree;
import team7.maakbaarleuven.analyseTree.repo.AnalyseTreeRepository;

@Service
public class AnalyseTreeService {
    @Autowired
    private AnalyseTreeRepository analyseTreeRepository;

    public AnalyseTree getBranch(){
        return analyseTreeRepository.findAll();
    }
}
