package mongodb.service;

/**
 * Created by lenovo on 2017/5/4.
 */
public interface MongoService<T> {
    public void update(T entity);
    public void insert(T entity);
    public void delete(T entity);
}
