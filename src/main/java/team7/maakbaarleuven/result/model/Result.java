package team7.maakbaarleuven.result.model;

import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "results")
public class Result {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    public long id;

    public List<Integer> result;

    public Result() {
    }

    public Result(List<Integer> result) {
        this.result = result;
    }
    
    
    
}
