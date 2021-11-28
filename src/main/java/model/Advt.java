package model;

import java.util.Date;
import java.util.Objects;
import javax.persistence.*;

@Entity
@Table(name = "ads")
public class Advt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private boolean status;

    @Column(nullable = false)
    private boolean photo;

    @Column(nullable = false)
    private int mileage;

    @Column(nullable = false)
    private int year;

    @Column(nullable = false)
    private int owners;

    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "models_id", nullable = false)
    private Model model;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "body_id", nullable = false)
    private Body body;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "transmission_id", nullable = false)
    private Transmission transmission;

    public static Advt of(String name, int price, String description, int year, int mileage, int owners, Model model, Body body, User user, Transmission transmission) {
        Advt advt = new Advt();
        advt.name = name;
        advt.price = price;
        advt.description = description;
        advt.created = new Date(System.currentTimeMillis());
        advt.status = false;
        advt.photo = false;
        advt.year = year;
        advt.mileage = mileage;
        advt.owners = owners;
        advt.setModel(model);
        advt.setBody(body);
        advt.setUser(user);
        advt.setTransmission(transmission);
        return advt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }



    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public boolean isPhoto() {
        return photo;
    }

    public void setPhoto(boolean photo) {
        this.photo = photo;
    }

    public int getMileage() {
        return mileage;
    }

    public void setMileage(int mileage) {
        this.mileage = mileage;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getOwners() {
        return owners;
    }

    public void setOwners(int owners) {
        this.owners = owners;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Model getModel() {
        return model;
    }

    public void setModel(Model model) {
        this.model = model;
    }

    public Body getBody() {
        return body;
    }

    public void setBody(Body body) {
        this.body = body;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Transmission getTransmission() {
        return transmission;
    }

    public void setTransmission(Transmission transmission) {
        this.transmission = transmission;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Advt advt = (Advt) o;
        return id == advt.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Advt{"
                + "id=" + id
                + ", name='" + name + '\''
                + ", price=" + price
                + ", description='" + description + '\''
                + ", status=" + status
                + ", photo=" + photo
                + ", mileage=" + mileage
                + ", year=" + year
                + ", owners=" + owners
                + ", created=" + created
                + ", model=" + model
                + ", body=" + body
                + ", user=" + user
                + ", transmission=" + transmission
                + '}';
    }
}
