package team7.maakbaarleuven.device.model;

import java.util.List;

public class Device {
    

    
    private int deviceModelNumber;
    private int energyConsumption;
    private int buildYear;
    public Device () {   
    }

    public Device (int deviceModelNumber, int energyConsumption, int buildYear) {
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
