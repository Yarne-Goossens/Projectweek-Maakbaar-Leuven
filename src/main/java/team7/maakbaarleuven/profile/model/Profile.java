package team7.maakbaarleuven.profile.model;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "profiles")
public class Profile {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    public long id;
    private String email;
    private String firstname;
    private String lastname;
    private String password;
    public Role role;

    public Profile() {
    }

    public Profile(String email, String firstname, String lastname, String password, Role role) {
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        setPassword(password);
        this.role = role;
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
        // Hash the password before storing it
        this.password = new BCryptPasswordEncoder().encode(password);
    }

}
