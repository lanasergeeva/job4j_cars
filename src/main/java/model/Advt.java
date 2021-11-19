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
    private String description;
    @Column(nullable = false)
    private boolean status;

    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "mark_id", nullable = false)
    private Mark mark;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "body_id", nullable = false)
    private Body body;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public static Advt of(String name, String description, Mark mark, Body body, User user) {
        Advt advt = new Advt();
        advt.name = name;
        advt.description = description;
        advt.created = new Date(System.currentTimeMillis());
        advt.status = false;
        advt.setMark(mark);
        advt.setBody(body);
        advt.setUser(user);
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

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Mark getMark() {
        return mark;
    }

    public void setMark(Mark mark) {
        this.mark = mark;
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


}
