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
    public String deviceModelNumber;
    public int purchasePrice;
    public int buildYear;
    public Device () {   
    }

    public Device (String deviceModelNumber, int purchasePrice, int buildYear) {
        this.deviceModelNumber = deviceModelNumber;
        this.purchasePrice = purchasePrice;
        this.buildYear = buildYear;
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

    public void setBuildYear(int buildYear) {
        this.buildYear = buildYear;
    }

    public int getBuildYear() {
        return this.buildYear;
    }

}
