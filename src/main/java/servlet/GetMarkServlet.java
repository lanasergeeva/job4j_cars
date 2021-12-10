package servlet;
import model.Mark;
import store.HbmStore;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;

public class GetMarkServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/plain");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter writer = new PrintWriter(new OutputStreamWriter(
                resp.getOutputStream(), StandardCharsets.UTF_8));
        int id = Integer.parseInt(req.getReader().readLine());
        Mark mark = HbmStore.instOf().findMarkById(id);
        HttpSession sc = req.getSession();
        sc.removeAttribute("mark");
        sc.setAttribute("mark", mark);
        writer.print("200 OK");
        writer.flush();
    }
}
