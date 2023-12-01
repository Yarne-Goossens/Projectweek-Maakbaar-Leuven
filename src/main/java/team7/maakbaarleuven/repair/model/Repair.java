package team7.maakbaarleuven.repair.model;

import java.util.ArrayList;


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
    private String deviceType;
    private String deviceModelNumber;
    private float purchasePrice;
    private float willingToPay;
    private float ageInMonths;
    private String mainChoice;
    private ArrayList<Integer> answersIds;
    private String location;
    private String dateOfRepair;
    private String status;


    @ManyToOne
    @JoinColumn(name = "profile_id")
    @JsonBackReference
    public Profile profile;

    public Repair() {
    }

    public Repair(String deviceType, String deviceModelNumber, float purchasePrice, float willingToPay, float ageInMonths, String mainChoice, ArrayList<Integer> answersIds, String location, String dateOfRepair, String status ) {
        this.deviceType = "Stofzuiger";
        this.deviceModelNumber = deviceModelNumber;
        this.purchasePrice = purchasePrice;
        this.willingToPay = willingToPay;
        this.ageInMonths = ageInMonths;
        this.mainChoice = mainChoice;
        this.answersIds = answersIds;
        this.status = "In behandling";
        this.dateOfRepair = dateOfRepair;
        this.location = "Online";
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

    public float getPurchasePrice() {
        return this.purchasePrice;
    }

    public void setPurchasePrice(float purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public float getWillingToPay() {
        return this.willingToPay;
    }

    public void setWillingToPay(float willingToPay) {
        this.willingToPay = willingToPay;
    }

    public void setAnswersIds(ArrayList<Integer> answersIds) {
        this.answersIds = answersIds;
    }

    public float getAgeInMonths() {
        return this.ageInMonths;
    }

    public void setAgeInMonths(float ageInMonths) {
        this.ageInMonths = ageInMonths;
    }

    public String getMainChoice() {
        return this.mainChoice;
    }

    public void setMainChoice(String mainChoice) {
        this.mainChoice = mainChoice;
    }

    public ArrayList<Integer> getAnswersIds() {
        return this.answersIds;
    }

    public void setAnswers(ArrayList<Integer> answersIds) {
        this.answersIds = answersIds;
    }

    
}
