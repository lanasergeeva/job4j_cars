package store;

import model.Advt;
import model.Mark;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.function.Function;

public class HbmStore implements Store {

    public static void main(String[] args) {
        Date date = Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant());
        System.out.println(date);
        System.out.println(HbmStore.instOf().findAllToday());
        System.out.println(HbmStore.instOf().findAllAdvtWithPhoto());
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
    public Advt add(Advt advt) {
        tx(session -> session.save(advt));
        return advt;
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

    @Override
    public List<Advt> findAllAdvtByMark(Mark mark) {
        String rsl = "select at from model.Advt at "
                + "where at.mark = :mark";
        return tx(
                session -> session.createQuery(rsl)
                        .setParameter("mark", mark).list());
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
