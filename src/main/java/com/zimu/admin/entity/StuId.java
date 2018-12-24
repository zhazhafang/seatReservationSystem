package com.zimu.admin.entity;

import io.github.biezhi.anima.Model;
import io.github.biezhi.anima.annotation.Column;
import io.github.biezhi.anima.annotation.Table;
import lombok.Data;

/**
 * @Author: HJ
 * @Date: 2018/12/21 17:51
 * @Version:
 */
@Data
@Table(name = "stuId", pk = "id")
public class StuId extends Model {
    private Integer id;
    @Column(name = "userPhysicalCard")//anima转换规则，列名含大写若报错，可进行此声明
    private String userPhysicalCard;
    private String password;
    private String nickname;
    private Integer userId;
    private String BDTime;
    private String isuserself;

}
