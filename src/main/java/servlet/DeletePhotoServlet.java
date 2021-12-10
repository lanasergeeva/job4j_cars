package servlet;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

public class DeletePhotoServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/plain");
        resp.setCharacterEncoding("UTF-8");
        String name = req.getReader().readLine();
        System.out.println("имя" + name);
        File file = new File("C:\\images\\car_pic\\" + name + ".png");
        if (file.exists()) {
            Files.delete(file.toPath());
        }
    }
}
