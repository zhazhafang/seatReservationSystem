package com.zimu.admin.entity;

import com.blade.ioc.annotation.Bean;
import io.github.biezhi.anima.Model;
import io.github.biezhi.anima.annotation.Table;
import lombok.Data;

/**
 * @author : zimu
 * @Date: 2018/9/18 19:12
 * @description :
 */
@Data
@Table(name = "record", pk = "id")
public class Record extends Model {
    private Integer id;
    private String day;
    private String bookTime;
    private String room;
    private String seatNo;
    private String stuId;
}
