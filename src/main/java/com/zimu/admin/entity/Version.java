package com.zimu.admin.entity;

import io.github.biezhi.anima.Model;
import io.github.biezhi.anima.annotation.Column;
import io.github.biezhi.anima.annotation.Table;
import lombok.Data;

/**
 *
 *
 * @Description:
 * @param:
 * @return:
 * @auther: HJ
 * @date: 2018/10/14 15:46
 */
@Data
@Table(name = "version", pk = "id")
public class Version extends Model {
    private Integer id;
    private String content;
    private String version;
    @Column(name = "updateTime")
    private String updateTime;
    private String download;
}
