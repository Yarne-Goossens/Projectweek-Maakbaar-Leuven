package team7.maakbaarleuven.analyseTree.repo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import team7.maakbaarleuven.analyseTree.model.AnalyseTree;


public interface AnalyseTreeRepository extends JpaRepository<List<String>, Long> {


}
