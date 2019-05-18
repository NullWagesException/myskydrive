package com.zf.controller;

import com.zf.myutils.SymmetricEncoder;
import com.zf.pojo.File;
import com.zf.pojo.FileLinks;
import com.zf.pojo.User;
import com.zf.service.IFileLinksService;
import com.zf.service.IFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.*;
import java.io.*;

import static com.zf.myutils.FileEncryptAndDecrypt.decrypt;
import static com.zf.myutils.FileEncryptAndDecrypt.encrypt;


@Controller
@RequestMapping("file")
public class FileC {

    @Autowired
    private IFileService fileService;

    @Autowired
    private IFileLinksService fileLinksService;

    String str="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    private String getcode(){
        StringBuilder sb=new StringBuilder(8);
        for(int i=0;i<8;i++)
        {
            char ch=str.charAt(new Random().nextInt(str.length()));
            sb.append(ch);
        }
        return sb.toString();
    }

    private User islogin(HttpSession session, Map<String, Object> map){
        User loginUser = (User) session.getAttribute("loginUser");
        //如果不是登陆态
        if (loginUser == null){
            map.put("success",false);
            map.put("message","登陆态已失效，请重新登陆");
            return null;
        }
        return loginUser;
    }

    @RequestMapping(value = "upload",method = RequestMethod.POST)
    @ResponseBody
    public Object upload(MultipartFile file,HttpSession session) throws Exception {
        String filepath = "";
        InputStream inputStream = null;
        OutputStream outputStream = null;
        Map<String,Object> map = new HashMap<>();
        User loginUser = islogin(session,map);
        if (loginUser == null) return map;
        try {
            inputStream = file.getInputStream();
            byte[] bytes = new byte[1024];
            Date date = new Date();
            //加入时间戳，保证唯一性并加密文件名
            //使用DES加密文件名
            String filename = "___" + date.getTime() + "___" + file.getOriginalFilename();
            filename = SymmetricEncoder.encrypt(filename);
            String replace = filename.replace("/", "___");
            filepath ="D:/KDR/" +  replace + "." + file.getOriginalFilename().split("\\.")[1];
            outputStream = new FileOutputStream(filepath);
            int len = -1;
            while ((len = inputStream.read(bytes)) != -1) {
                //写入磁盘
                outputStream.write(bytes);
            }
            //写入完成后存入文件信息到数据库
            File filemessage = new File();
            filemessage.setDate(new Date());
            filemessage.setFilepath(replace+ "." + file.getOriginalFilename().split("\\.")[1]);

            filemessage.setUsername(loginUser.getUsername());
            fileService.insert(filemessage);

        }catch (Exception e){
            e.printStackTrace();
            map.put("success",false);
            map.put("message","文件写入失败");
            return map;
        }finally {
            try {
                inputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                outputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        //对文件进行加密，密钥为123456
        encrypt(filepath,"123456");
        map.put("success",true);
        map.put("message","文件提交成功");
        return map;

    }

    @RequestMapping("getAll")
    @ResponseBody
    public Object getAll(HttpSession session) throws Exception {

        Map<String,Object> map = new HashMap<>();
        User loginUser = islogin(session,map);
        if (loginUser == null) return map;
        List<File> all = fileService.getAll();
        for (File file : all) {
            String replace = file.getFilepath().replace("___", "/");
            String str = replace.split("\\.")[0];
            String decrypt = SymmetricEncoder.decrypt(str);
            file.setFilename(decrypt.split("___")[2]);
            file.setFilepath("");
        }

        List<File> myfiles = new ArrayList<>();
        if (loginUser.getLevel() == 0){
            map.put("list", all);
            return map;
        }
        for (File file : all) {
            if (file.getUsername().equals(loginUser.getUsername()))
                myfiles.add(file);
        }
        map.put("list", myfiles);
        return map;
    }

    @RequestMapping("downloadfile")
    @ResponseBody
    public Object download(String filelink,String filepassword) throws IOException {
        Map<String,Object> map = new HashMap<>();
        FileLinks links = new FileLinks();
        //设置链接
        links.setFilelink(filelink);
        //设置密码
        links.setLinkpassword(filepassword);
        FileLinks fileLinks = fileLinksService.get(links);

        int fileid = fileLinks.getFileid();
        File file = new File();
        file.setId(fileid);
        File file1 = fileService.get(file);
        if (fileLinks != null){
            fileLinks.setIsuse(1);
            //将该记录设置为已使用
            fileLinksService.update(fileLinks);
            map.put("success",true);
            map.put("message",file1.getFilepath());
            return map;
        }
        return null;
    }

    @RequestMapping("downloading")
    public void downloading(HttpServletRequest request, HttpServletResponse response,String downloadfilepath) throws Exception {
        //转码，免得文件名中文乱码
//        filelink = URLEncoder.encode(filelink,"UTF-8");
        String replace = downloadfilepath.replace(" ", "+");
        decrypt("D:/KDR/" + replace,"D:/KDR/temp" + replace,6);
        //设置文件下载头
        response.addHeader("Content-Disposition", "attachment;filename=" + replace);
        //1.设置文件ContentType类型，这样设置，会自动判断下载文件类型
        response.setContentType("multipart/form-data");
        //将文件完成解密，存放到临时文件
        // 读取要下载的文件，保存到文件输入流
        FileInputStream in = new FileInputStream("D:/KDR/temp" + replace);
        // 创建输出流
        OutputStream out = response.getOutputStream();
        // 创建缓冲区
        byte buffer[] = new byte[1024]; // 缓冲区的大小设置是个迷  我也没搞明白
        int len = 0;
        //循环将输入流中的内容读取到缓冲区当中
        while((len = in.read(buffer)) > 0){
            out.write(buffer, 0, len);
        }
        //关闭文件输入流
        in.close();
        // 关闭输出流
        out.close();
        //将临时文件删除
        java.io.File file = new java.io.File("D:/KDR/temp" + replace);
//        if (file.exists())
//            file.delete();
    }

    @RequestMapping("share")
    @ResponseBody
    public Object share(HttpSession session,Integer id){

        File file = new File();
        file.setId(id);
        File file1 = fileService.get(file);
        Map<String,Object> map = new HashMap<>();
        User loginUser = islogin(session,map);
        if (loginUser == null) return map;

        java.io.File Dfile = new java.io.File("D:/KDR/" + file1.getFilepath());
        // 如果文件路径所对应的文件存在，并且是一个文件，则直接删除
        if (Dfile.exists() && Dfile.isFile()) {
            map.put("success",true);
            map.put("message","分享成功！");
            map.put("filelink",file1.getFilepath().split("\\.")[0]);
            String code = getcode();
            map.put("linkpassword",code);
            FileLinks fileLinks = new FileLinks();
            fileLinks.setFileid(file1.getId());
            fileLinks.setFilelink(file1.getFilepath().split("\\.")[0]);
            fileLinks.setLinkpassword(code);
            fileLinks.setIsuse(0);
            fileLinksService.insert(fileLinks);
            return map;
        } else {
            map.put("success",false);
            map.put("message","分享失败");
            return map;
        }

    }


    @RequestMapping("upfile")
    @ResponseBody
    public Object upfile(Integer filelevel,Integer id){
        try {
            File file = new File();
            file.setId(id);
            file = fileService.get(file);
            fileService.update(file);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

}
