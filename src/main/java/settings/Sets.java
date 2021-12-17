package settings;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;


public class Sets {

    private static final Logger LOG = LoggerFactory.getLogger(Sets.class.getName());
    private final Properties properties = new Properties();

    private static final class Lazy {
        private static final Sets INST = new Sets();
    }

    public static Sets instOf() {
        return Sets.Lazy.INST;
    }

    public Sets() {
        try (InputStream in =
                     Sets.class.getClassLoader().getResourceAsStream("app.properties")) {
            properties.load(in);
        } catch (IOException e) {
            LOG.error("Exception in Setting. Something wrong in properties", e);
        }
    }

    public String getPath(String key) {
        return properties.getProperty(key);
    }
}


