package com.zimu.admin.service;


/**
 * @author : zimu
 * @Date: 2018/8/15 01:21
 * @description :
 */
import com.blade.mvc.http.Request;
import com.blade.mvc.http.Response;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.Random;

public class Vcode {
    /**
     * 生成随机验证码
     * @param type  类型
     * @param length   长度
     * @param exChars  排除的字符
     * @return
     */
    public static final char[] chars="1234567890QWERTYUIOPASDFGHJKLZXCVBNM".toCharArray();
    public static Random random = new Random();
    public static String getRandomString(){
        StringBuffer buffer = new StringBuffer();
        int index; //获取随机chars下标
        for(int i=0;i<4;i++){
            index = random.nextInt(chars.length); //获取随机chars下标
            buffer.append(chars[index]);
        } return buffer.toString();
    }

    public static Color getRandomColor(){
        return new Color(random.nextInt(255),random.nextInt(255),random.nextInt(255));
    }

    public static Color getReverseColor(Color c){
        if(c.getRed()<130&&c.getRed()>125 && c.getBlue()<130&& c.getBlue()>125 && c.getGreen()<130&&c.getGreen()>125){
            return new Color(255,255,255); }else{ return new Color(255-c.getRed(),255-c.getGreen(),255-c.getBlue()); }
    }

    public void doGet(Request req,Response resp)  {
        try {
            String code = getRandomString(); //获取随机验证码
            req.session().attribute("code", code); //放入Session
            int width = 100; //图片宽度
            int height = 30; //图片高度
            Color color = getRandomColor(); //随机色，用于背景色
            Color reverse = getReverseColor(color); //反色，用于前景色 /** * 生成带字符串的文本图片 */ // 1.创建图片缓存区 传参为宽高和图片类型
            BufferedImage bi = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB); // 2.获取画笔并绘画
            Graphics g = bi.getGraphics();
            g.setFont(new Font(Font.SANS_SERIF, Font.BOLD, 16));//设置字体
            g.setColor(color);//设置画笔颜色
            g.fillRect(0, 0, width, height); //绘制背景
            g.setColor(reverse); //设置画笔颜色
            g.drawString(code, 18, 20); //绘制字符 // 设置最多100个噪音点
            for (int i = 0, n = random.nextInt(100); i < n; i++) {
                g.drawRect(random.nextInt(width), random.nextInt(height), 1, 1);
            } // 3.输出图片
//            ImageIO.write(bi, "JPG", new File("target/classes/static/images/yzm.jpg"));
//            File directory = new File("..");
//            System.out.println(directory.getAbsolutePath());
            String pathname = this.getClass().getClassLoader().getResource("").getPath();
            System.out.println(pathname+"=====================================");
            ImageIO.write(bi, "JPG", new File(pathname+"static/img/yzm.jpg"));
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(789);
        }

    }



}
