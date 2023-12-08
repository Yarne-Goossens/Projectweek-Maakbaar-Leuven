package team7.maakbaarleuven.deviceType.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "deviceTypes")
public class deviceType {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    public long id;
    public String deviceType;
    public List<String> deviceQuestions;

    public deviceType() {
    }

    public deviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public String getDeviceType() {
        return this.deviceType;
    }

    public void setDeviceQuestions(List<String> deviceQuestions) {
        this.deviceQuestions = deviceQuestions;
    }

    public List<String> getDeviceQuestions() {
        return this.deviceQuestions;
    }
    
}
