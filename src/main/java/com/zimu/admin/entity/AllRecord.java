package com.zimu.admin.entity;

import io.github.biezhi.anima.Model;
import io.github.biezhi.anima.annotation.Table;
import lombok.Data;

/**
 * @author : zimu
 * @Date: 2018/10/7 12:13
 * @description :所有记录
 */
@Data
@Table(name = "allRecord",pk = "id")
public class AllRecord extends Model {
    private Integer id;
    private Integer bookId;
    private String etagId;
    private String etagMd5;
    private Integer userId;
    private Integer status;
    private String appointmentDate;
    private String statTime;
    private String endTime;
    private String roomName;
    private String seatNo;
}
