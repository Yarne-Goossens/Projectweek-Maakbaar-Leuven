package team7.maakbaarleuven.analyseTree.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import team7.maakbaarleuven.analyseTree.model.AnalyseTree;
import team7.maakbaarleuven.analyseTree.service.AnalyseTreeService;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("api/analyseTree")
public class AnalyseTreeRestController {
    @Autowired
    private AnalyseTreeService analyseTreeService;

    @GetMapping("/overview")
    public List<AnalyseTree> getMatrix(){
        return analyseTreeService.getMatrix();
    }
}
