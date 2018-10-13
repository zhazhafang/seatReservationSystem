package com.zimu.admin.service;

import com.alibaba.fastjson.JSONObject;
import com.blade.mvc.http.Request;
import com.zimu.admin.entity.*;
import io.github.biezhi.anima.page.Page;

import static io.github.biezhi.anima.Anima.select;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author : zimu
 * @Date: 2018/9/18 18:59
 * @description : 功能实现类
 */

public class Show {
    /**
     *
     *
     * @Description: 每间教室平面图
     * @param: room
     * @return:  List<Record>
     * @auther: zimu
     * @date: 2018/9/22 21:19
     */
    public List<Record> findData(String room){
        Date date = new Date();
        Record record = new Record();
        String stuId = null;
        Md5 md5 = new Md5();
        String username = null;
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String day = df.format(date);
        df = new SimpleDateFormat("HH:mm:ss");
        int temp = Integer.parseInt(df.format(date).substring(0,2))-5;
        String startTime = null;
        if(temp < 10){
            startTime ="0"+ temp + df.format(date).substring(2) ;
        }else {
            startTime =temp + df.format(date).substring(2) ;
        }

        String endTime = df.format(date);
//        System.out.println(startTime+"11111111111"+endTime);
        List<Record> recordList = select().from(Record.class).where("day", day)
                .where("room", room)
                .between("bookTime", startTime, endTime).all();

        for (int i=0; i<recordList.size(); i++){
            stuId = recordList.get(i).getStuId();
            stuId = md5.getMd5(stuId);
            username = select().bySQL(String.class, "select username from user where stuID='"+stuId+"'").one();
            recordList.get(i).setDay(username);
        }

        return recordList;
    }

    /**
     *
     *
     * @Description: 获得每个人学号数量及占比
     * @param: NULL
     * @return: JSONObject
     * @auther: zimu
     * @date: 2018/9/22 21:20
     */
    public JSONObject getUserData(){
        long total = select().from(Users.class).count();
        JSONObject jsonObject = new JSONObject();
        List<Long> unameTotal = new ArrayList<Long>();
        List<String> unameList = new ArrayList<String>();
        jsonObject.put("total", total);
        List<Users> usersList = select().bySQL(Users.class, "SELECT distinct username FROM user WHERE username is not NULL").all();
        for (Users users : usersList){
            String test = users.getUsername();
            unameList.add(test);
            unameTotal.add(select().from(Users.class).where("username", users.getUsername()).count());
        }
        jsonObject.put("unameList", unameList);
        jsonObject.put("unameTotal", unameTotal);
        return jsonObject;
    }
    /**
     *
     *
     * @Description: 分页显示用户
     * @param: Request request, Integer page
     * @return: void
     * @auther: zimu
     * @date: 2018/9/26 9:02
     */
    public void users(Request request, Integer page) {
        Page<Users> usersList =select().from(Users.class).page(page, 12);
        request.attribute("users", usersList);
    }

    /**
     *
     *
     * @Description: 分页显示公告
     * @param: Request request, Integer page
     * @return: void
     * @auther: zimu
     * @date: 2018/9/26 9:02
     */
    public void pages(Request request, Integer page) {
        Page<Shouye> notices =select().from(Shouye.class).page(page, 12);
        System.out.println(notices);
        request.attribute("notices", notices);
    }

    /**
     *
     *
     * @Description: 分页显示授权码
     * @param: Request request, Integer page
     * @return: void
     * @auther: zimu
     * @date: 2018/9/27 8:34
     */
    public void Acodes(Request request, Integer page) {
        Page<Acode> Acodes =select().from(Acode.class).page(page, 12);
        request.attribute("Acodes", Acodes);
    }

    /**
     * @Description: 获取预定记录（大部分人）
     * @param:
     * @return:
     * @auther: zimu
     * @date: 2018/10/7 12:18
     */

    public List<AllRecord> showOther(Request request, String room) {
        Date date = new Date();
        AllRecord record = new AllRecord();
        JSONObject jsonObject = new JSONObject();
        Integer userId;
//        Md5 md5 = new Md5();
        StuInfo info = null;
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String day = df.format(date);
        try {
            day = String.valueOf(df.parse(day).getTime()/1000)+"000";
        }catch (Exception e){
            e.printStackTrace();
        }
        df = new SimpleDateFormat("HH:mm");
        int temp = Integer.parseInt(df.format(date).substring(0,2))-5;
        String startTime = null;
        if(temp < 10){
            startTime ="0"+ temp + df.format(date).substring(2) ;
        }else {
            startTime =temp + df.format(date).substring(2) ;
        }
        room = room+"自习室";
        String endTime = df.format(date);
//        System.out.println(startTime+"11111111111"+endTime);
        List<AllRecord> recordList = select().from(AllRecord.class).where("appointmentDate", day)
                .where("roomName", room)
                .between("statTime", startTime, endTime).limit(2000);

        for (int i=0; i<recordList.size(); i++){
            userId = recordList.get(i).getUserId();
            info = select().bySQL(StuInfo.class, "select * from stuInfo where userId='"+userId+"'").one();
            try {
                recordList.get(i).setEtagId(info.getUserName());
                recordList.get(i).setEtagMd5(info.getUserPhysicalCard());
            }catch (Exception e){
                recordList.get(i).setEtagId("未查到！");
                recordList.get(i).setEtagMd5("未查到！");
                continue;
            }
        }

        return recordList;
    }
    /**
     *
     *
     * @Description: 分页查询所有记录
     * @param: Request request, Integer page
     * @return: void
     * @auther: zimu
     * @date: 2018/10/10 14:26
     */
    public void showAllRecord(Request request, Integer page) {
        Page<AllRecord> records =select().from(AllRecord.class).order("id desc").page(page, 12);
        int userId;
        StuInfo info = new StuInfo();
        String time = "";
        Date date;
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        for (int i=0; i<records.getRows().size(); i++){
            userId = records.getRows().get(i).getUserId();
            info = select().from(StuInfo.class).where("userId",userId).one();
            if (info == null) {
                records.getRows().get(i).setEtagId("未查到！");
                records.getRows().get(i).setEtagMd5("未查到！");
            }else {
                records.getRows().get(i).setEtagId(info.getUserName());
                records.getRows().get(i).setEtagMd5(info.getUserPhysicalCard());
            }
            time = records.getRows().get(i).getAppointmentDate();
            date=new Date(Long.parseLong(time));
            time=df.format(date);
            records.getRows().get(i).setAppointmentDate(time+"");

        }
        request.attribute("records", records);
    }
}
