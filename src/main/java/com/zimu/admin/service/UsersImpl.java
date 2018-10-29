package com.zimu.admin.service;

import com.alibaba.fastjson.JSONObject;
import com.blade.mvc.http.Request;
import com.zimu.admin.entity.*;
import io.github.biezhi.anima.Anima;

import javax.xml.crypto.Data;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;

import static io.github.biezhi.anima.Anima.delete;
import static io.github.biezhi.anima.Anima.select;

/**
 * @author : zimu
 * @Date: 2018/9/24 21:13
 * @description :
 */
public class UsersImpl {
    public JSONObject delUser(Request request, Integer id) {
        int flag = delete().from(Users.class).where("id", id).execute();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("state", 200);
        if (flag > 0) {

            jsonObject.put("message", "删除成功！");
        }else {

            jsonObject.put("message", "删除失败！");
        }
        return jsonObject;
    }

    /**
     * @Description: 添加用户
     * @param: stuId
     * @return:
     * @auther: zimu
     * @date: 2018/9/25 16:05
     */

    public JSONObject addUser(Request request, String stuId) {
        JSONObject jsonObject = new JSONObject();
        Md5 md5 = new Md5();
        stuId = md5.getMd5(stuId).toLowerCase();
        Users users = new Users();
        users.setStuID(stuId);
        Anima.atomic(() -> {
            Integer  id  = users.save().asInt();
        }).catchException(e -> {
            e.printStackTrace();
        });

        jsonObject.put("state", 200);
        jsonObject.put("message", "添加成功！");
        return jsonObject;
    }
    /**
     * @Description: 添加公告
     * @param: stuId
     * @return:
     * @auther: zimu
     * @date: 2018/9/25 16:05
     */

    public JSONObject addNotice(Request request, String title, String content) {
        JSONObject jsonObject = new JSONObject();
        Date date = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String time = df.format(date);
        Shouye notice  = new Shouye();
        notice.setTitle(title);
        notice.setContent(content);
        notice.setTime(time);
        Anima.atomic(() -> {
            Integer  id  = notice.save().asInt();
        }).catchException(e -> {
            e.printStackTrace();
        });

        jsonObject.put("state", 200);
        jsonObject.put("message", "新增公告成功！");
        return jsonObject;
    }
    /**
     *
     *
     * @Description: 删除公告
     * @param: Request request, Integer id
     * @return: JSONObject
     * @auther: zimu
     * @date: 2018/9/26 9:43
     */
    public JSONObject delNotice(Request request, Integer id) {
        int flag = delete().from(Shouye.class).where("id", id).execute();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("state", 200);
        if (flag > 0) {

            jsonObject.put("message", "删除成功！");
        }else {

            jsonObject.put("message", "删除失败！");
        }
        return jsonObject;
    }

    /**
     * @Description: 生成授权码
     * @param: Request request
     * @return: JSONObject
     * @auther: zimu
     * @date: 2018/9/25 16:05
     */

    public JSONObject createACode(Request request, Integer num) {
        JSONObject jsonObject = new JSONObject();
        Date date = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = df.format(date);
        String str="zxcvbnmlkjhgfdsaqwertyuiopQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
        Random random=new Random();
        StringBuffer sb=new StringBuffer();
        for(int i=0; i<16; ++i){
            //产生0-61的数字
            int number=random.nextInt(62);
            //将产生的数字通过length次承载到sb中
            sb.append(str.charAt(number));
        }
        Acode acode = new Acode();
        acode.setCode(sb.toString());
        acode.setNum(num);
        acode.setTime(time);
        acode.setStuId("");
        Anima.atomic(() -> {
            Integer  id  = acode.save().asInt();
        }).catchException(e -> {
            e.printStackTrace();
        });

        jsonObject.put("state", 200);
        jsonObject.put("message", "生成授权码成功！");
        return jsonObject;
    }

    /**
     *
     *
     * @Description: 删除授权码
     * @param: Request request, Integer id
     * @return: JSONObject
     * @auther: zimu
     * @date: 2018/9/26 9:43
     */
    public JSONObject delACode(Request request, Integer id) {
        int flag = delete().from(Acode.class).where("id", id).execute();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("state", 200);
        if (flag > 0) {

            jsonObject.put("message", "删除成功！");
        }else {

            jsonObject.put("message", "删除失败！");
        }
        return jsonObject;
    }

    /**
     * @Description: 获取授权用户
     * @param:
     * @return:
     * @auther: zimu
     * @date: 2018/9/27 9:28
     */

    public JSONObject getACStuId(Integer id) {
        List<Acode> acodes = select("stuId").from(Acode.class).where("id", id).all();
        String stuId = acodes.get(0).getStuId();
        stuId = "{" +stuId +"}";
        JSONObject object = JSONObject.parseObject(stuId);
        return object;
    }

    /**
     * @Description: 查询用户
     * @param:
     * @return:
     * @auther: zimu
     * @date: 2018/10/7 0:01
     */

    public void pAllUsers(Request request, String stuId) {
        StuInfo stuInfo = select().from(StuInfo.class).where("userPhysicalCard", stuId).one();
        request.attribute("stuInfo", stuInfo);
    }

    /**
     *
     *
     * @Description: 查询单个人的预订记录
     * @param: Request request, String stuId
     * @return: void
     * @auther: zimu
     * @date: 2018/10/10 15:57
     */
    public void getRecord(Request request, String stuId) {
        String time = "";
        Date date;
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        StuInfo info = select().from(StuInfo.class).where("userPhysicalCard", stuId).one();
        String userId = info.getUserId();
        List<AllRecord> records = select().from(AllRecord.class).where("userId", userId).all();

        for (AllRecord record : records) {
            time = record.getAppointmentDate();
            date=new Date(Long.parseLong(time));
            time=df.format(date);
            record.setAppointmentDate(time);
        }
        request.attribute("stuId", stuId);
        request.attribute("recordOne", records);

    }

    public void sendMessage(Request request, int userId, String sendMessage) {
        /**
         *
         * 功能描述: 实现发送信息
         *
         * @param: [request, userId, sendMessage]
         * @return: void
         * @auther: zimu
         * @date: 2018/10/30 0:32
         */
        Chat chat = new Chat();
        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = dateFormat.format(date);
        chat.setUserId(userId);
        chat.setSendMessage(sendMessage);
        chat.setTime(time);
        Integer flag = chat.save().asInt();
    }
}
