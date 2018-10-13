package com.zimu.admin;

import com.blade.Blade;

/**
 * @author : zimu
 * @Date: 2018/9/18 18:39
 * @description : 入口
 */
public class Application {
    public static void main(String[] args) {
        Blade.of().start(Application.class, args);
    }
}
