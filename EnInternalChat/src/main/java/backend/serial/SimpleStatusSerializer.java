package backend.serial;

import backend.mdoel.SimpleStatus;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

/**
 * Created by lenovo on 2017/5/29.
 */
public class SimpleStatusSerializer extends StdSerializer<SimpleStatus> {
    public SimpleStatusSerializer() { this(null); }
    public SimpleStatusSerializer(Class<SimpleStatus> t) { super(t); }
    @Override
    public void serialize(SimpleStatus simpleStatus, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        if(simpleStatus == null) {
            return;
        }
        jsonGenerator.writeStartObject();
        jsonGenerator.writeBooleanField("status",simpleStatus.isStatus());
        jsonGenerator.writeStringField("info",simpleStatus.getInfo());
        jsonGenerator.writeEndObject();
    }
}
