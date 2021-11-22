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

            User two = User.of("Андрей", "89781478526", "privetAndrey@mail.ru", "111");
            session.save(two);

            Body bodyT = Body.of("sedan");
            session.save(bodyT);

            Mark markT = Mark.of("Daewoo Lanos");
            session.save(markT);

            Advt advtT = Advt.of("Лучший в мире Ланос",
                    "Пробег 700тыс", markT, bodyT, two);
            advtT.setPhoto(true);
            session.save(advtT);

            session.getTransaction().commit();
            session.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            StandardServiceRegistryBuilder.destroy(registry);
        }
    }
}

