package com.zimu.admin.entity;

import io.github.biezhi.anima.Model;
import io.github.biezhi.anima.annotation.Column;
import io.github.biezhi.anima.annotation.Table;
import lombok.Data;

/**
 * @author : zimu
 * @Date: 2018/9/27 08:30
 * @description :授权码
 */
@Data
@Table(name = "Acode", pk = "id")
public class Acode extends Model {
    private Integer id;
    private String code;
    private Integer num;
    private String time;
    @Column(name = "stuId")
    private String stuId;
}
