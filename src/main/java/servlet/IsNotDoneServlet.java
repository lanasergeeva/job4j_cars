package servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import store.HbmStore;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;

public class IsNotDoneServlet extends HttpServlet {
    private static final Gson GSON = new GsonBuilder().create();


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/plain");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter writer = new PrintWriter(new OutputStreamWriter(
                resp.getOutputStream(), StandardCharsets.UTF_8));
        int id = Integer.parseInt(req.getReader().readLine());
        System.out.println("Айди" + id);
        HbmStore.instOf().isNotDone(id);
        System.out.println("Статус не продано");
        //store.deleteCompletedItems();
    }
}