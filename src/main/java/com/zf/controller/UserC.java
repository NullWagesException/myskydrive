package com.zf.controller;

import com.zf.pojo.User;
import com.zf.service.IFileLinksService;
import com.zf.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserC {

    @Autowired
    private IUserService userService;

    @Autowired
    private IFileLinksService uplevelService;
    
    @RequestMapping("editpassword")
    @ResponseBody
    public Object editpassword(String newpass,HttpSession session){
        User loginUser = (User) session.getAttribute("loginUser");
        //如果不是登陆态
        if (loginUser == null){
            return "登陆态已失效，请重新登陆";
        }
        loginUser.setPassword(newpass);
        userService.update(loginUser);
        return newpass;
    }

    @RequestMapping("showName")
    @ResponseBody
    public Object showName(HttpSession session){
        User loginUser = (User) session.getAttribute("loginUser");
        Map<String,Object> map = new HashMap<>();
        if (loginUser != null){
            map.put("success",true);
            map.put("message",loginUser.getUsername());
        }else{
            map.put("success",false);
            map.put("message","登陆态失效，请重新登陆");
        }
        return map;
    }

    @RequestMapping("user/getAll")
    @ResponseBody
    public Object getAll(HttpSession session){
        List<User> userList = userService.getAll();
        int index = 0;
        User loginUser = (User) session.getAttribute("loginUser");
        for (User user : userList) {
            user.setPassword("");
        }
        for (User user : userList) {
            if (user.getId().equals(loginUser.getId())){
                break;
            }
            index++;
        }
        userList.remove(index);
        return userList;
    }

    @RequestMapping("edituser")
    @ResponseBody
    public Object edituser(User user){
        try {
            User olduser = userService.getID(user);
            user.setPassword(olduser.getPassword());
            userService.update(user);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @RequestMapping("userdel")
    @ResponseBody
    public Object userdel(Integer id){
        try {
            userService.delete(id);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @RequestMapping("checkuserlevel")
    @ResponseBody
    public Object checkuserlevel(HttpSession session,Integer id){
        User user = new User();
        user.setId(id);
        user = userService.getID(user);
        User loginUser = (User) session.getAttribute("loginUser");
        Map<String,Object> map = new HashMap<>();
        //如果不是登陆态
        if (loginUser == null){
            map.put("success",false);
            map.put("message","登陆态已失效，请重新登陆");
            return map;
        }
        //如果用户等级比文件等级低
        if (loginUser.getLevel()+1  > user.getLevel()){
            map.put("success",false);
            map.put("message","权限不足");
            return map;
        }
        map.put("success",true);
        return map;

    }


}
