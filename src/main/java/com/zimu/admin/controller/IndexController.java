package com.zimu.admin.controller;

import com.alibaba.fastjson.JSONObject;
import com.blade.mvc.annotation.*;
import com.blade.mvc.http.Request;
import com.zimu.admin.entity.AllRecord;
import com.zimu.admin.entity.Record;
import com.zimu.admin.service.Show;
import com.zimu.admin.service.UsersImpl;
import sun.nio.cs.ext.MacDingbat;

import java.util.List;

/**
 * @author : zimu
 * @Date: 2018/9/18 18:40
 * @description :   首页索引
 */
@Path
public class IndexController {
    /**
     *
     *
     * @Description: 首页
     * @param:
     * @return: void
     * @auther: zimu
     * @date: 2018/9/18 19:00
     */

    @GetRoute("/")
    public String index(){
        return "index.html";
    }

    /**
     *
     *
     * @Description: 101自习室平面图
     * @param: NULL
     * @return: String
     * @auther: zimu
     * @date: 2018/9/24 21:06
     */
    @GetRoute("/101")
    public String getPage101(){
        return "page/index.html";
    }

    /**
     *
     *
     * @Description: 202自习室平面图
     * @param: NULL
     * @return:
     * @auther: zimu
     * @date: 2018/9/24 21:07
     */
    @GetRoute("/202")
    public String getPage202(){
        return "page/202.html";
    }

    /**
     *
     *
     * @Description:    303自习室平面图
     * @param: NULL
     * @return: NULL
     * @auther: zimu
     * @date: 2018/9/24 21:07
     */
    @GetRoute("/203")
    public String getPage203(){
        return "page/203.html";
    }

    /**
     *
     *
     * @Description: 分页查询用户
     * @param: Integer page
     * @return: String
     * @auther: zimu
     * @date: 2018/9/24 21:08
     */
    @GetRoute("/user")
    public String getUser(Request request){
        Integer page = Integer.valueOf(request.query("page", "1"));
        Show show = new Show();
        show.users(request, page);
        return "page/users.html";
    }

    /**
     *
     *
     * @Description: 显示使用者位置
     * @param: String room
     * @return: List<Record>
     * @auther: zimu
     * @date: 2018/9/24 21:09
     */

    @PostRoute("/show")
    @JSON
    public List<Record> show(Request request, @Param String room){
        Show show = new Show();

        List<Record> recordList = show.findData(room);
        return recordList;
    }

    /**
     *
     *
     * @Description: 饼状图获取用户信息
     * @param: NULL
     * @return: JSONObject
     * @auther: zimu
     * @date: 2018/9/24 21:10
     */
    @PostRoute("/user")
    @JSON
    public JSONObject user(Request request){
        Show show = new Show();
        JSONObject json = show.getUserData();
        return json;
    }

    /**
     *
     *
     * @Description: 删除用户
     * @param: Integer id
     * @return:
     * @auther: zimu
     * @date: 2018/9/24 21:11
     */
    @PostRoute("delUser")
    @JSON
    public JSONObject delUser(Request request, @Param Integer id) {
        UsersImpl users = new UsersImpl();
        JSONObject jsonObject = users.delUser(request, id);
        return jsonObject;
    }
    /**
     *
     *
     * @Description: 添加用户
     * @param: stuId
     * @return:
     * @auther: zimu
     * @date: 2018/9/25 16:03
     */
    @PostRoute("/addUser")
    @JSON
    public JSONObject addUser(Request request, @Param String stuId){
        UsersImpl users = new UsersImpl();
        JSONObject jsonObject = new JSONObject();
        jsonObject = users.addUser(request, stuId);
        return jsonObject;
    }

    /**
     * @Description: 公告列表
     * @param:
     * @return:
     * @auther: zimu
     * @date: 2018/9/26 8:46
     */
    @GetRoute("/notice")
    public String notice(Request request) {
        Integer page = Integer.valueOf(request.query("page", "1"));
        Show show = new Show();
        show.pages(request, page);
        return "/page/notice.html";
    }
    /**
     *
     *
     * @Description: 添加公告
     * @param: stuId
     * @return:
     * @auther: zimu
     * @date: 2018/9/25 16:03
     */
    @PostRoute("/addNotice")
    @JSON
    public JSONObject addNotice(Request request, @Param String title, @Param String content){
        UsersImpl users = new UsersImpl();
        JSONObject jsonObject = new JSONObject();
        jsonObject = users.addNotice(request, title, content);
        return jsonObject;
    }
    /**
     *
     *
     * @Description: 删除公告
     * @param: Integer id
     * @return:
     * @auther: zimu
     * @date: 2018/9/24 21:11
     */
    @PostRoute("delNotice")
    @JSON
    public JSONObject delNotice(Request request, @Param Integer id) {
        UsersImpl users = new UsersImpl();
        JSONObject jsonObject = users.delNotice(request, id);
        return jsonObject;
    }
    /**
     *
     * 
     * @Description: 版本列表
     * @param: request
     * @return: 
     * @auther: HJ
     * @date: 2018/10/14 16:02
     */
    @GetRoute("/version")
    public String updateVersion(Request request) {
        Integer showVersion = Integer.valueOf(request.query("page", "1"));
        Show show = new Show();
        show.showVersion(request, showVersion);
        return "/page/updateVersion";
    }
    /**
     *
     * 
     * @Description: 添加版本
     * @param: Request request, String context,  String version, String updateTime, String download
     * @return: 
     * @auther: HJ
     * @date: 2018/10/14 16:02
     */
    @PostRoute("/addVersion")
    @JSON
    public JSONObject addVersion(Request request, @Param String version, @Param String content,@Param String download){
        UsersImpl users = new UsersImpl();
        JSONObject jsonObject = new JSONObject();
        jsonObject = users.addVersion(request,version, content, download);
        return jsonObject;
    }
    /**
     *
     * 
     * @Description: 删除版本
     * @param: Request request, Integer id
     * @return: 
     * @auther: HJ
     * @date: 2018/10/14 15:21
     */
    @PostRoute("delVersion")
    @JSON
    public JSONObject delVersion(Request request, @Param Integer id) {
        UsersImpl users = new UsersImpl();
        JSONObject jsonObject = users.delVersion(request, id);
        return jsonObject;
    }

    /**
     * @Description: 授权码
     * @param:
     * @return:
     * @auther: zimu
     * @date: 2018/9/27 7:34
     */

    @GetRoute("/authorizationCode")
    public String authorizationCode(Request request) {
        Integer page = Integer.valueOf(request.query("page", "1"));
        Show show = new Show();
        show.Acodes(request, page);
        return "page/authorizationCode";
    }

    /**
     *
     *
     * @Description: 生成授权码
     * @param: Request request
     * @return: JSONObject
     * @auther: zimu
     * @date: 2018/9/25 16:03
     */
    @PostRoute("/createACode")
    @JSON
    public JSONObject createACode(Request request, @Param Integer num){
        UsersImpl users = new UsersImpl();
        JSONObject jsonObject = new JSONObject();
        jsonObject = users.createACode(request, num);
        return jsonObject;
    }

    /**
     *
     *
     * @Description: 删除授权码
     * @param: Integer id
     * @return: JSONObject
     * @auther: zimu
     * @date: 2018/9/24 21:11
     */
    @PostRoute("delACode")
    @JSON
    public JSONObject delACode(Request request, @Param Integer id) {
        UsersImpl users = new UsersImpl();
        JSONObject jsonObject = users.delACode(request, id);
        return jsonObject;
    }

    /**
     * @Description: 获得授权学号
     * @param:
     * @return:
     * @auther: zimu
     * @date: 2018/9/27 9:26
     */
    @PostRoute("/getACStuId")
    @JSON
    public JSONObject getACStuId(@Param Integer id) {
        JSONObject jsonObject = new JSONObject();
        UsersImpl users = new UsersImpl();
        jsonObject = users.getACStuId(id);
        return jsonObject;
    }

    /**
     *
     *
     * @Description: 所有用户查询路由
     * @param:
     * @return:
     * @auther: zimu
     * @date: 2018/10/6 23:29
     */

    @GetRoute("/allUsers")
    public String allUsers(){
        return "page/allUsers";
    }

    /**
     *
     *
     * @Description:查询用户
     * @param:
     * @return:
     * @auther: zimu
     * @date: 2018/10/7 0:00
     */

    @PostRoute("/allUsers")
    public String pAllUsers(Request request, @Param String stuId){
        UsersImpl users = new UsersImpl();
        users.pAllUsers(request, stuId);
        return "/page/allUsers";
    }

    /**
     * @Description: 显示非软件用户的位置
     * @param:
     * @return:
     * @auther: zimu
     * @date: 2018/10/7 12:10
     */
    @PostRoute("/showOther")
    @JSON
    public List<AllRecord> showOther(Request request, @Param String room) {
        Show show = new Show();
        List<AllRecord> recordList = show.showOther(request, room);
        return recordList;
    }

    /**
     *
     *
     * @Description:   获取所有预定记录
     * @param:
     * @return:
     * @auther: zimu
     * @date: 2018/10/10 14:20
     */

    @GetRoute("/getRecord")
    public String getRecord(Request request){
        Integer page = request.queryInt("page", 1);
        Show show = new Show();
        show.showAllRecord(request, page);
        return "/page/getRecord";
    }

    /**
     * @Description: 查询某个人的预定记录
     * @param:
     * @return:
     * @auther: zimu
     * @date: 2018/10/10 15:55
     */

    @PostRoute("/getRecord")
    public String getRecord(Request request, @Param String stuId) {
        UsersImpl users = new UsersImpl();
        users.getRecord(request, stuId);
        return "/page/getRecord";
    }
}
