package team7.maakbaarleuven.repair.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import team7.maakbaarleuven.profile.model.Profile;

@Entity
@Table(name = "repairs")
public class Repair {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long id;
    // private int entryNumber;
    private String deviceType;
    private String status;
    private String deviceModelNumber;
    private String dateOfRepair;
    private String location;
    @ManyToOne
    @JoinColumn(name = "profile_id")
    @JsonBackReference
    public Profile profile;

    public Repair() {
    }

    public Repair(String deviceType, String status, String deviceModelNumber, String dateOfRepair,
            String location) {
        // this.entryNumber = entryNumber;
        this.deviceType = deviceType;
        this.status = status;
        this.deviceModelNumber = deviceModelNumber;
        this.dateOfRepair = dateOfRepair;
        this.location = location;
    }

    // public void setEntryNumber(int entryNumber) {
    // this.entryNumber = entryNumber;
    // }

    // public int getEntryNumber() {
    // return this.entryNumber;
    // }

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

    public void setDeviceModelNumber(String deviceModelNumber) {
        this.deviceModelNumber = deviceModelNumber;
    }

    public String getDeviceModelNumber() {
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

    public Profile getProfile() {
        return this.profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }
}
