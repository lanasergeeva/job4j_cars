package store;

import model.*;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.exception.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.NoResultException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.function.Function;
import javax.persistence.Query;

public class HbmStore implements Store {

    public static void main(String[] args) {
        User us = HbmStore.instOf().findByEmailUser("la@la");
        System.out.println(HbmStore.instOf().findByUser(us));
    }

    private static final Logger LOG = LoggerFactory.getLogger(HbmStore.class.getName());

    private final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
            .configure().build();
    private final SessionFactory sf = new MetadataSources(registry)
            .buildMetadata().buildSessionFactory();

    private static final class Lazy {
        private static final Store INST = new HbmStore();
    }

    public static Store instOf() {
        return Lazy.INST;
    }

    @Override
    public User addUser(User user) throws ConstraintViolationException {
        tx(session -> session.save(user));
        return user;
    }

    @Override
    public Advt add(Advt advt) throws ConstraintViolationException {
        tx(session -> session.save(advt));
        return advt;
    }

    @Override
    public List<Transmission> findAllTrans() {
        return tx(
                session -> session.createQuery("from model.Transmission").list());
    }

    @Override
    public List<Model> findAllModel() {
        return tx(
                session -> session.createQuery("from model.Model").list());
    }

    @Override
    public List<Mark> findAllMarks() {
        return tx(
                session -> session.createQuery("from model.Mark").list());
    }

    @Override
    public List<Mark> findAllBodies() {
        return tx(
                session -> session.createQuery("from model.Body").list());
    }


    @Override
    public boolean delete(int id) {
        return tx(session ->
                session.createQuery("delete from model.Advt "
                        + "as advt where advt.id=:id").
                        setParameter("id", id)
                        .executeUpdate() > 0);
    }

    @Override
    public boolean done(int id) {
        String hql = "update model.Advt as ad "
                + " set status = :done where ad.id=:id";
        return tx(session -> {
                    Query query = session.createQuery(hql);
                    query.setParameter("id", id);
                    query.setParameter("done", true);
                    return query.executeUpdate() > 0;
                }
        );
    }

    @Override
    public boolean isNotDone(int id) {
        String hql = "update model.Advt as ad "
                + " set status = :done where ad.id=:id";
        return tx(session -> {
                    Query query = session.createQuery(hql);
                    query.setParameter("id", id);
                    query.setParameter("done", false);
                    return query.executeUpdate() > 0;
                }
        );
    }

    @Override
    public List<Advt> findAll() {
        return tx(
                session -> session.createQuery("from model.Advt").list());
    }

    @Override
    public List<Advt> findAllAdvtWithPhoto() {
        String rsl = "select at from model.Advt at "
                + "where at.photo = true";
        return tx(
                session -> session.createQuery(rsl).list());
    }

   /* @Override
    public List<Advt> findAllAdvtByMark(Mark mark) {
        String rsl = "select at from model.Advt at "
                + "where at.mark = :mark";
        return tx(
                session -> session.createQuery(rsl)
                        .setParameter("mark", mark).list());
    }*/

    @Override
    public List<Advt> findByUser(User user) {
        String rsl = "select at from model.Advt at "
                + "where at.user = :user";
        return tx(
                session -> session.createQuery(rsl)
                        .setParameter("user", user).list());
    }

    @Override
    public List<Advt> findAllToday() {
        Date date = Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant());
        String rsl = "select a from Advt a "
                + "where a.created BETWEEN :date AND current_timestamp ";
        return tx(
                session -> session.createQuery(rsl)
                        .setParameter("date", date).list());
    }

    @Override
    public User findByEmailUser(String email) throws NoResultException {
        User rsl;
        rsl = (User) tx(
                session -> session
                        .createQuery("from model.User as user where user.email=:email").
                                setParameter("email", email).getSingleResult());
        return rsl;
    }


    private <T> T tx(final Function<Session, T> command) {
        final Session session = sf.openSession();
        final Transaction tx = session.beginTransaction();
        try {
            T rsl = command.apply(session);
            tx.commit();
            return rsl;
        } catch (final Exception e) {
            session.getTransaction().rollback();
            throw e;
        } finally {
            session.close();

        }
    }
}
