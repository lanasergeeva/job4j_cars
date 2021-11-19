package model;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;

public class HbmCreatedTab {
    public static void main(String[] args) {
        final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
                .configure().build();
        try {
            SessionFactory sf = new MetadataSources(registry).buildMetadata().buildSessionFactory();
            Session session = sf.openSession();
            session.beginTransaction();

            User user = User.of("Пользователь", "89788884455", "neperekup@mail.ru", "123");
            session.save(user);

            Body body = Body.of("hatchback");
            session.save(body);

            Mark mark = Mark.of("Hyunday Accent");
            session.save(mark);

            Advt advt = Advt.of("Продаю бодрый Hyunday Accent. Быстрым - скидка!",
                    "На ходу. За машиной следил. Не перекуп", mark, body, user);

            session.save(advt);

            session.getTransaction().commit();
            session.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            StandardServiceRegistryBuilder.destroy(registry);
        }
    }
}

