//package mongodb.service;
//
//import mongodb.model.Employee;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.data.mongodb.core.query.Criteria;
//import org.springframework.data.mongodb.core.query.Query;
//import org.springframework.data.mongodb.core.query.Update;
//import org.springframework.stereotype.Repository;
//
///**
// * Created by lenovo on 2017/5/4.
// */
//
//@Repository
//public class EmployeeService implements MongoService<Employee>{
//    @Autowired
//    private MongoTemplate mongoTemplate;
//
//    @Override
//    public void update(Employee entity) {
//        Query query=new Query();
//        query.addCriteria(new Criteria("phone").is(entity.getPhone()));
//        Update update=new Update();
//        update.set("phone",entity.getPhone());
//        update.set("email",entity.getEmail());
//        update.set("name",entity.getName());
//        update.set("ID",entity.getID());
//        update.set("password",entity.getPwd());
//        this.mongoTemplate.updateFirst(query,update,Employee.class);
//    }
//
//    @Override
//    public void insert(Employee entity) {
//        System.out.println(mongoTemplate == null);
//        mongoTemplate.insert(entity);
//    }
//
//    @Override
//    public void delete(Employee entity) {
//
//    }
//}
