package com.zimu.admin.service;

import com.alibaba.fastjson.JSONObject;
import com.blade.mvc.http.Request;
import com.blade.mvc.http.Response;
import com.zimu.admin.entity.*;
import io.github.biezhi.anima.Anima;

import javax.xml.crypto.Data;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Connection;
import java.text.SimpleDateFormat;
import java.util.*;

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
     *
     *
     * @Description: 更新版本
     * @param: Request request, String content, String version,String updateTime,String download
     * @return:
     * @auther: HJ
     * @date: 2018/10/14 15:14
     */
    public JSONObject addVersion(Request request,String version, String content,String download) {
        JSONObject jsonObject = new JSONObject();
        Date date = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String time = df.format(date);
        Version ver  = new Version();
        ver.setVersion(version);
        ver.setContent(content);
        ver.setDownload(download);
        ver.setUpdateTime(time);
        Anima.atomic(() -> {
            Integer  id  = ver.save().asInt();
        }).catchException(e -> {
            e.printStackTrace();
        });

        jsonObject.put("state", 200);
        jsonObject.put("message", "添加版本成功！");
        return jsonObject;
    }
    /**
     *
     *
     * @Description: 删除版本
     * @param: Request request, Integer id
     * @return:
     * @auther: HJ
     * @date: 2018/10/14 15:16
     */
    public JSONObject delVersion(Request request, Integer id) {
        int flag = delete().from(Version.class).where("id", id).execute();
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
        /**
         *
         * 功能描述: 获取本库记录
         *
         * @param: [request, stuId]
         * @return: void
         * @auther: zimu
         * @date: 2018/12/2 10:08
         */
        String time = "";
        Date date;
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        StuInfo info = select().from(StuInfo.class).where("userPhysicalCard", stuId).one();
        if (info != null) {
            String userId = info.getUserId();
            List<AllRecord> records = select().from(AllRecord.class).where("userId", userId).order("id desc").limit(10);
            for (AllRecord record : records) {
                time = record.getAppointmentDate();
                date=new Date(Long.parseLong(time));
                time=df.format(date);
                record.setAppointmentDate(time);
            }
            request.attribute("stuId", stuId);
            request.attribute("recordOne", records);
            System.out.println(records);
        }
        else {
            request.attribute("stuId", stuId);
            request.attribute("recordOne", "");
        }
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

    public int delChat(Request request, int id) {
        /**
         *
         * 功能描述: 删除聊天记录
         *
         * @param: [request, id]
         * @return: int
         * @auther: zimu
         * @date: 2018/12/2 10:08
         */
        int flag = delete().from(Chat.class).where("id", id).execute();
        return flag;
    }

    public int getUserInfoFromSchool(Request request, String params) {
        /**
         *
         * 功能描述: 实现外库查询
         *
         * @param: [request, params]
         * @return: int
         * @auther: zimu
         * @date: 2018/12/2 8:54
         */
        try {
            URL url = new URL("http://211.70.171.14:9999/tsgintf/main/service");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestProperty("Content-Type","application/json;charset=UTF-8");
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.getOutputStream().write(params.getBytes());
            connection.connect();
            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));
            String result = br.readLine();
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            request.attribute("stuInfo", jsonObject);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    public void getRecordFromSchool(Request request, String params, String cookie) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        try {
            URL url = new URL("http://211.70.171.14:9999/tsgintf/main/service");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestProperty("Content-Type","application/json;charset=UTF-8");
            connection.setRequestProperty("Cookie",cookie);
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.getOutputStream().write(params.getBytes());
            connection.connect();
            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String result = br.readLine();
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject.get("result_code").equals("2")) {
                request.attribute("flag", 2);
            }else {
                request.attribute("flag", 1);
                JSONObject result_data = (JSONObject) jsonObject.get("result_data");
                List rows = (List) result_data.get("rows");
                int i = 1;
                List<AllRecord> records = new ArrayList();
                for (Object row : rows) {
                    JSONObject rowJson = (JSONObject) JSONObject.toJSON(row);
                    AllRecord record = new AllRecord();
                    record.setId((Integer) rowJson.get("id"));
                    record.setAppointmentDate(df.format(new Date(Long.parseLong(rowJson.get("appointmentDate")+""))));
                    record.setRoomName((String) rowJson.get("roomName"));
                    record.setSeatNo((String) rowJson.get("seatNo"));
                    record.setStatTime((String) rowJson.get("statTime"));
                    record.setStatus((Integer) rowJson.get("status"));

                    records.add(record);
                    if (i == 10) {
                        break;
                    }
                    i++;
                }
                request.attribute("recordOne", records);
            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public JSONObject toLogin(Request request, String params) {
        JSONObject returnObject = new JSONObject();
        try {
            URL url = new URL("http://211.70.171.14:9999/tsgintf/main/service");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type","application/json;charset=UTF-8");

            connection.setDoOutput(true);
            connection.getOutputStream().write(params.getBytes());
            connection.connect();
            Map map = connection.getHeaderFields();
            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String result = br.readLine();
            JSONObject object = (JSONObject) JSONObject.parse(result);
            if(object.get("result_code").equals("0")){
                String cookie = map.get("Set-Cookie").toString().split(";")[0].substring(1);
                returnObject.put("status", 1);
                returnObject.put("message", "登录成功！");
                returnObject.put("setCookie", cookie);
            }else {
                returnObject.put("status", 2);
                returnObject.put("message", object.get("result_desc"));
                returnObject.put("setCookie", null);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return returnObject;
    }

    public void getVcode(Request request, Response response) {
        Vcode vcode = new Vcode();
        vcode.doGet(request,response);
    }

    public int doDelDBData(Request request, int count, String dbname) {
        int flag = Anima.execute("DELETE FROM "+dbname+" LIMIT ?",count);
        if (flag == count) {
            return 1;
        }else
            return 0;
    }

    public void cancelBook(Request request, String params, String cookie) {
        try {
            URL url = new URL("http://211.70.171.14:9999/tsgintf/main/service");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type","application/json;charset=UTF-8");
            connection.setRequestProperty("Cookie",cookie);
            connection.setDoOutput(true);
            connection.getOutputStream().write(params.getBytes());
            connection.connect();
            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            JSONObject jsonObject = (JSONObject) JSONObject.parse(br.readLine());
            if (jsonObject.get("result_code").equals("2")) {
                request.attribute("flag", 2);
            }
            else {
                System.out.println(jsonObject);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public int upInfo(Request request, String params, String cookie) {
        int i=0;
        try {
            URL url = new URL("http://211.70.171.14:9999/tsgintf/main/service");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type","application/json;charset=UTF-8");
            connection.setRequestProperty("Cookie", cookie);
            connection.setDoOutput(true);
            connection.getOutputStream().write(params.getBytes());
            connection.connect();
            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            JSONObject jsonObject = (JSONObject) JSONObject.parse(br.readLine());
            if (jsonObject.get("result_code").equals("0")) {
                i = 1;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return i;
    }
}
