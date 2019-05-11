package com.zf.controller;

import com.zf.pojo.User;
import com.zf.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
public class LoginC {

    @Autowired
    private IUserService userService;

    @RequestMapping("tologin")
    @ResponseBody
    public Object login(User user, HttpSession session){
        User user1 = userService.get(user);
        Map<String,Object> map = new HashMap<>();
        //如果用户名和密码正确
        if (user1 != null){
            session.setAttribute("loginUser",user1);
            map.put("success",true);
            map.put("message","登陆成功");
        }else{
            map.put("success",false);
            map.put("message","登陆失败，用户名或密码错误");
        }
        return map;
    }

    @RequestMapping("toregister")
    @ResponseBody
    public Object register(User user){
        String username = user.getUsername();
        User register = new User();
        Map<String,Object> map = new HashMap<>();
        register.setUsername(username);
        User user1 = userService.check(register);
        System.out.println(user1);
        if (user1 != null){
            map.put("success",false);
            map.put("message","注册失败，用户名已存在");
        }else{
            userService.insert(user);
            map.put("success",true);
            map.put("message","注册成功");
        }
        return map;
    }


}
