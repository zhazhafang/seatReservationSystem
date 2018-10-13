package com.zimu.admin.entity;

import io.github.biezhi.anima.Model;
import io.github.biezhi.anima.annotation.Table;
import lombok.Data;

/**
 * @author : zimu
 * @Date: 2018/9/26 09:03
 * @description :
 */
@Data
@Table(name = "shouye", pk = "id")
public class Shouye extends Model {
    private Integer id;
    private String title;
    private String content;
    private String time;
}
