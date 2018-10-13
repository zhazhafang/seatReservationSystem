package com.zimu.admin.entity;

import io.github.biezhi.anima.Model;
import io.github.biezhi.anima.annotation.Column;
import io.github.biezhi.anima.annotation.Table;
import lombok.Data;

/**
 * @author : zimu
 * @Date: 2018/9/19 09:42
 * @description :
 */
@Data
@Table(name = "user", pk = "id")
public class Users extends Model {
    private Integer id;
    @Column(name = "stuID")
    private String  stuID;
    private String  username;
    private String  tel;
}
