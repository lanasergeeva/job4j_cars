import model.*;
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

            Body body = Body.of("хэтчбек");
            session.save(body);

            Mark mark = Mark.of("Hyunday");
            session.save(mark);

            Model model = Model.of("Accent", mark);
            session.save(model);

            Transmission tr = Transmission.of("Автомат");
            session.save(tr);

            Advt advt = Advt.of(269250,
                    "На ходу. За машиной следил. Не перекуп", 2010, 259666, 5, model, body, user, tr);
            session.save(advt);

            User two = User.of("Андрей", "89781478526", "privetAndrey@mail.ru", "111");
            session.save(two);

            Body bodyT = Body.of("седан");
            session.save(bodyT);

            Mark markT = Mark.of("Daewoo");
            session.save(markT);

            Model modelT = Model.of("Lanos", markT);
            session.save(modelT);

            Transmission trT = Transmission.of("Механика");
            session.save(trT);

            Advt advtT = Advt.of(159000,
                    "Пробег 700тыс", 2007, 399000, 8, modelT, bodyT, two, trT);
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

