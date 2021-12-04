package store;

import model.*;

import java.util.List;

public interface Store {

    Advt add(Advt add);

    User addUser(User user);

    boolean delete(int id);

    List<Advt> findAll();

    List<Advt> findAllAdvtWithPhoto();

    /*   List<Advt> findAllAdvtByMark(Mark mark);*/

    List<Advt> findAllToday();

    List<Transmission> findAllTrans();

    List<Model> findAllModel();

    List<Mark> findAllMarks();

    List<Mark> findAllBodies();

    User findByEmailUser(String name);

    List<Advt> findByUser(User user);

    boolean done(int id);

    boolean isNotDone(int id);

}
