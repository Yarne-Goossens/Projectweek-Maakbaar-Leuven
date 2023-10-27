package team7.maakbaarleuven.result.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "solutions")
public class Solution {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    public long id;
    
    public List<Integer> solution;

    public Solution() {
    }

    public Solution(List<Integer> solution) {
        this.solution = solution;
    }

    public void setSolution(List<Integer> solution) {
        this.solution = solution;
    }

    public List<Integer> getSolution() {
        return this.solution;
    }
    
    
}
