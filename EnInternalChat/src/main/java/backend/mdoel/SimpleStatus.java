package backend.mdoel;

import backend.serial.SimpleStatusSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.io.Serializable;

/**
 * Created by lenovo on 2017/5/29.
 */
@JsonSerialize(using = SimpleStatusSerializer.class)
public class SimpleStatus implements Serializable {
    private boolean status;
    private String info;

    public SimpleStatus(boolean status, String info) {
        this.status = status;
        this.info = info;
    }

    public boolean isStatus() {
        return status;
    }

    public String getInfo() {
        return info;
    }
}
