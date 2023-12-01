package team7.maakbaarleuven.profile.model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import team7.maakbaarleuven.repair.model.Repair;

@Entity
@Table(name = "profile")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public long id;
    private String email;
    private String firstname;
    private String lastname;
    private String password;
    public String role;
    @OneToMany(mappedBy = "profile")
    @JsonManagedReference
    public Set<Repair> repairs;

    public Profile() {
    }

    public Profile(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public Profile(String email, String firstname, String lastname, String password, Role role) {
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.role = role.toString();
    }

    public String getEmail() {
        return this.email;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return this.firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return this.lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Set<Repair> getRepairs() {
        if (repairs == null) {
            repairs = new HashSet<>();
        }

        return repairs;
    }

    public void addRepair(Repair repair) {
        this.repairs.add(repair);
    }

    public void removeRepair(Repair repair) {
        this.repairs.remove(repair);
    }
}
