package servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import model.Advt;
import model.User;
import org.hibernate.exception.ConstraintViolationException;
import store.HbmStore;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.Date;

public class AdvtServlet extends HttpServlet {

    private static final Gson GSON = new GsonBuilder().create();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json; charset=utf-8");
        PrintWriter writer = new PrintWriter(new OutputStreamWriter(
                resp.getOutputStream(), StandardCharsets.UTF_8));
        Advt advt = GSON.fromJson(req.getReader(), Advt.class);
        User user = (User) req.getSession().getAttribute("user");
        User check = HbmStore.instOf().findByEmailUser(user.getEmail());
        System.out.println(check);
        advt.setUser(check);
        advt.setCreated(new Date(System.currentTimeMillis()));
        System.out.println(advt);
        try {
            HbmStore.instOf().add(advt);
            String json = GSON.toJson(advt);
            OutputStream output = resp.getOutputStream();
            output.write(json.getBytes(StandardCharsets.UTF_8));
            output.flush();
            output.close();
        } catch (ConstraintViolationException e) {
            writer.print("400 Bad Request");
        }
        writer.flush();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json; charset=utf-8");
        OutputStream output = resp.getOutputStream();
        String json = GSON.toJson(HbmStore.instOf().findAll());
        output.write(json.getBytes(StandardCharsets.UTF_8));
        output.flush();
        output.close();
    }
}
