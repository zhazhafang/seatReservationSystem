package com.zimu.admin.entity;

import io.github.biezhi.anima.Model;
import io.github.biezhi.anima.annotation.Table;
import lombok.Data;
import lombok.Value;

/**
 * @author : zimu
 * @Date: 2018/10/7 00:03
 * @description :
 */
@Data
@Table(name = "stuInfo")
public class StuInfo extends Model {
    private String userId;
    private String userPhysicalCard;
    private String userName;
    private String mobile;
    private String password;
    private String dept;
    private String wechat;
}
