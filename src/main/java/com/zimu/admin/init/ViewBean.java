package com.zimu.admin.init;

import com.blade.Blade;
import com.blade.Environment;
import com.blade.ioc.annotation.Bean;
import com.blade.loader.BladeLoader;
import com.blade.mvc.view.template.JetbrickTemplateEngine;

/**
 * @author : zimu
 * @Date: 2018/9/18 19:09
 * @description :
 */
@Bean
public class ViewBean implements BladeLoader {
    @Override
    public void load(Blade blade) {
        Environment ev = blade.environment();

        JetbrickTemplateEngine template = new JetbrickTemplateEngine();
        template.addConfig("jetx.import.classes", "com.zimu.admin.entity.*");
        blade.templateEngine(template);
    }
}
