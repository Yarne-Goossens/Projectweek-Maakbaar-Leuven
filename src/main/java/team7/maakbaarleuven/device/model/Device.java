package team7.maakbaarleuven.device.model;

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
@Table(name = "devices")
public class Device {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    public long id;
    public String merk;
    public String deviceModelNumber;
    public int purchasePrice;
    public String purchaseDate;
    public boolean isRepaired;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    @JsonBackReference
    public Profile profile;

    public Device() {
    }

    public Device(String merk, String deviceModelNumber, int purchasePrice, String purchaseDate,
            String diagnose,
            long userId, Profile profile, boolean isRepaired) {
        this.merk = merk;
        this.deviceModelNumber = deviceModelNumber;
        this.purchasePrice = purchasePrice;
        this.purchaseDate = purchaseDate;
        this.profile = profile;
        this.isRepaired = isRepaired;
    }

    public void setDeviceModelNumber(String deviceModelNumber) {
        this.deviceModelNumber = deviceModelNumber;
    }

    public String getDeviceModelNumber() {
        return this.deviceModelNumber;
    }

    public void setPurchasePrice(int purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public int getPurchasePrice() {
        return this.purchasePrice;
    }

    public void setPurchaseDate(String purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public String getPurchaseDate() {
        return this.purchaseDate;
    }

    public Profile getProfile() {
        return this.profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public boolean getIsRepaired() {
        return this.isRepaired;
    }

    public void setIsRepaired(boolean isRepaired) {
        this.isRepaired = isRepaired;
    }
}