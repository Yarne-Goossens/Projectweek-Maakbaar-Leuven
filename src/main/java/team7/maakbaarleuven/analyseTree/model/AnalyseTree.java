package team7.maakbaarleuven.analyseTree.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tree")
public class AnalyseTree {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    public long id;
    public List<String> branch1;
    public List<String> branch2;
    public List<String> branch3;
    public List<String> branch4;
    public List<String> branch5;
    public List<String> branch6;
    public List<String> branch7;
    public List<String> branch8;


    public AnalyseTree(){}
    public AnalyseTree(List<String> branch1,List<String> branch2,List<String> branch3,List<String> branch4,List<String> branch5,List<String> branch6,List<String> branch7,List<String> branch8){
        this.branch1 = branch1;
        this.branch2 = branch2;
        this.branch3 = branch3;
        this.branch4 = branch4;
        this.branch5 = branch5;
        this.branch6 = branch6;
        this.branch7 = branch7;
        this.branch8 = branch8;
    }

    public List<String> getBranch1() {
        return this.branch1;
    }

    public List<String> getBranch2() {
        return this.branch2;
    }
    public List<String> getBranch3() {
        return this.branch3;
    }
    
    public List<String> getBranch4() {
        return this.branch4;
    }
    
    public List<String> getBranch5() {
        return this.branch5;
    }
    
    public List<String> getBranch6() {
        return this.branch6;
    }
    
    public List<String> getBranch7() {
        return this.branch7;
    }
    
    public List<String> getBranch8() {
        return this.branch8;
    }

    public void setBranch1(List<String> branch1) {
        this.branch1 = branch1;
    }

    public void setBranch2(List<String> branch2) {
        this.branch2 = branch2;
    }

    public void setBranch3(List<String> branch3) {
        this.branch3 = branch3;
    }

    public void setBranch4(List<String> branch4) {
        this.branch4 = branch4;
    }

    public void setBranch5(List<String> branch5) {
        this.branch5 = branch5;
    }

    public void setBranch6(List<String> branch6) {
        this.branch6 = branch6;
    }

    public void setBranch7(List<String> branch7) {
        this.branch7 = branch7;
    }

    public void setBranch8(List<String> branch8) {
        this.branch8 = branch8;
    }

}


