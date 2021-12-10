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
        try {
            User check = HbmStore.instOf().findByEmailUser(user.getEmail());
            String json = GSON.toJson(HbmStore.instOf().findByUser(check));
            System.out.println("Строка" + json);
            output.write(json.getBytes(StandardCharsets.UTF_8));
        } catch (NoResultException e) {
            output.write(1);
        }
        output.flush();
        output.close();
    }
}
