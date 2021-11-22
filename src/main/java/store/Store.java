package store;

import model.Advt;
import model.Mark;

import java.util.List;

public interface Store {

    Advt add(Advt add);

    boolean delete(int id);

    List<Advt> findAll();

    List<Advt> findAllAdvtWithPhoto();

    List<Advt> findAllAdvtByMark(Mark mark);

    List<Advt> findAllToday();

}
