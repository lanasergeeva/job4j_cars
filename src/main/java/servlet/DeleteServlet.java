package servlet;

import store.HbmStore;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class DeleteServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/plain");
        resp.setCharacterEncoding("UTF-8");
        int id = Integer.parseInt(req.getReader().readLine());
        HbmStore.instOf().delete(id);
        Path path = Paths.get("C:\\images\\car_pic\\" + id + ".png");
        if (Files.exists(path) || path.toFile().exists()) {
            Files.delete(path);
        }
    }

}
