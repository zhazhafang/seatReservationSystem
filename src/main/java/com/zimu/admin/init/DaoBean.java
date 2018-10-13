package com.zimu.admin.init;

import com.blade.Blade;
import com.blade.Environment;
import com.blade.ioc.annotation.Bean;
import com.blade.loader.BladeLoader;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import io.github.biezhi.anima.Anima;

import java.util.Map;
import java.util.Properties;

/**
 * @author : zimu
 * @Date: 2018/9/18 19:08
 * @description :
 */
@Bean
public class DaoBean implements BladeLoader {
    @Override
    public void load(Blade blade) {
        Environment ev = blade.environment();
        Map<String, Object> hikari = ev.getPrefix("hikari");
        Properties ps = new Properties();
        ps.putAll(hikari);

        HikariDataSource dataSource = new HikariDataSource(new HikariConfig(ps));
        Anima.open(dataSource);
    }
}
