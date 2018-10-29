package com.zimu.admin.entity;

import io.github.biezhi.anima.Model;
import io.github.biezhi.anima.annotation.Column;
import io.github.biezhi.anima.annotation.Table;
import lombok.Data;

/**
 * @Auther: zimu
 * @Date: 2018/10/30 00:07
 * @Description:
 */
@Data
@Table(name = "chat", pk = "id")
public class Chat extends Model {
    private int id;
    @Column(name = "userId")
    private int userId;
    @Column(name = "sendMessage")
    private String sendMessage;
    @Column(name = "receiveMessage")
    private String receiveMessage;
    private String time;
}
