package team7.maakbaarleuven.repair.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "repairs")
public class Repair {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    public long id;
    private int entryNumber;
    private String deviceType;
    private String status;
    private int deviceModelNumber;
    private String dateOfRepair;
    private String location;

    public Repair() {
    }

    public Repair(int entryNumber, String deviceType, String status, int deviceModelNumber, String dateOfRepair, String location) {
        this.entryNumber = entryNumber;
        this.deviceType = deviceType;
        this.status = status;
        this.deviceModelNumber = deviceModelNumber;
        this.dateOfRepair = dateOfRepair;
        this.location = location;
    }

    public void setEntryNumber(int entryNumber) {
        this.entryNumber = entryNumber;
    }

    public int getEntryNumber() {
        return this.entryNumber;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public String getDeviceType() {
        return this.deviceType;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return this.status;
    }

    public void setDeviceModelNumber(int deviceModelNumber) {
        this.deviceModelNumber = deviceModelNumber;
    }

    public int getDeviceModelNumber() {
        return this.deviceModelNumber;
    }

    public void setDateOfRepair(String dateOfRepair) {
        this.dateOfRepair = dateOfRepair;
    }

    public String getDateOfRepair() {
        return this.dateOfRepair;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getLocation() {
        return this.location;
    }
}
