package com.zimu.admin.entity;

import io.github.biezhi.anima.Model;
import io.github.biezhi.anima.annotation.Column;
import io.github.biezhi.anima.annotation.Table;
import lombok.Data;

/**
 * @Author: HJ
 * @Date: 2018/12/20 10:21
 * @Version:
 */
@Data
@Table(name = "member",pk = "id")  //主键
public class Members extends Model {
    private Integer id;
    private String  name;
    private String  username;
    private String  password;
    private String  qq;
    private String  tel;
    private String  dormitory;
    private String  regtime;
    private Integer  ispass;
}
