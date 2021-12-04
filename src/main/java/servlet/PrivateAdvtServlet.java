package servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import model.User;
import store.HbmStore;

import javax.persistence.NoResultException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class PrivateAdvtServlet extends HttpServlet  {

    private static final Gson GSON = new GsonBuilder().create();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json; charset=utf-8");
        OutputStream output = resp.getOutputStream();
        User user = (User) req.getSession().getAttribute("user");
        System.out.println("Пользователь" + user);
        try {
            System.out.println("Hola");
            User check = HbmStore.instOf().findByEmailUser(user.getEmail());
            String json = GSON.toJson(HbmStore.instOf().findByUser(check));
            System.out.println("Строка" + json);
            output.write(json.getBytes(StandardCharsets.UTF_8));

        } catch (NoResultException e) {
            System.out.println("By");
           /* String json = GSON.toJson(HbmStore.instOf().findAll());
            output.write(json.getBytes(StandardCharsets.UTF_8));*/
        }
        output.flush();
        output.close();
    }
}
