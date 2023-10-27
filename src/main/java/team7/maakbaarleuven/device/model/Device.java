package team7.maakbaarleuven.device.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "devices")
public class Device {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    public long id;
    private int deviceModelNumber;
    private int energyConsumption;
    private int buildYear;

    public Device() {
    }

    public Device(int deviceModelNumber, int energyConsumption, int buildYear) {
        this.deviceModelNumber = deviceModelNumber;
        this.energyConsumption = energyConsumption;
        this.buildYear = buildYear;
    }

    public void setDeviceModelNumber(int deviceModelNumber) {
        this.deviceModelNumber = deviceModelNumber;
    }

    public int getDeviceModelNumber() {
        return this.deviceModelNumber;
    }

    public void setEnergyConsumption(int energyConsumption) {
        this.energyConsumption = energyConsumption;
    }

    public int getEnergyConsumption() {
        return this.energyConsumption;
    }

    public void setBuildYear(int buildYear) {
        this.buildYear = buildYear;
    }

    public int getBuildYear() {
        return this.buildYear;
    }
}