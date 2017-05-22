package backend.util;

/**
 * Created by lenovo on 2017/5/14.
 */
public class SectionTree {
//    private static Map<String, Object> sectionMap(Section section) {
//        Map<String, Object> result=new HashMap<>();
//        result.put("ID",section.getID());
//        result.put("name",section.getName());
//        result.put("leaderID",section.getLeaderID());
//        result.put("membersID",section.getMembersID());
//        result.put("note",section.getNote());
//
//        return result;
//    }
//    public static Map<String, Object> create(SectionRepository sectionRepository, long headSecID, String name) {
//        Section head=sectionRepository.findOne(headSecID);
//        long companyID=head.getCompanyID();
//        Map<String, Object> tree=new HashMap<>();
//        Map<String, Object> point=sectionMap(head);
//        ArrayList<Map<String, Object>> stackMap=new ArrayList<>();
//        ArrayList<Section> stackSection=new ArrayList<>();
//        stackMap.add(point);
//        stackSection.add(head);
//        tree.put("total",sectionRepository.findByCompanyID(companyID).size());
//        tree.put("companyName",name);
//        tree.put("sections",point);
//        int i=0;
//        while (true) {
//            Map<String, Object> presentSectionMap=stackMap.get(i);
//            long parrentID=stackSection.get(i).getID();
//            ArrayList<Section> children= (ArrayList<Section>) sectionRepository.findByCompanyIDAndParrentSectionID(companyID,parrentID);
//            ArrayList<Map<String, Object>> childrenSections= new ArrayList<>();
//            int len=children.size();
//            for(int j=0;j<len;j++) {
//                Map<String, Object> childMap=sectionMap(children.get(j));
//                stackMap.add(childMap);
//                stackSection.add(children.get(j));
//                childrenSections.add(childMap);
//            }
//            presentSectionMap.put("childrenSections",childrenSections);
//            i++;
//            if(i>=stackSection.size()) break;
//        }
//        return tree;
//        //TODO without test
//    }
}
