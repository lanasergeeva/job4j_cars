package servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import model.Mark;
import store.HbmStore;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class GetModelsMarkServlet extends HttpServlet {

    private static final Gson GSON = new GsonBuilder().create();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json; charset=utf-8");
        OutputStream output = resp.getOutputStream();
        Mark mark = (Mark) req.getSession().getAttribute("mark");
        String json = GSON.toJson(HbmStore.instOf().findAllModelByMark(mark));
        req.removeAttribute("mark");
        output.write(json.getBytes(StandardCharsets.UTF_8));
        output.flush();
        output.close();
    }
}
