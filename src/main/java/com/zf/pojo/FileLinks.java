package com.zf.pojo;

import java.util.Date;

public class FileLinks {

    private Integer id;
    private String filelink;
    private String linkpassword;
    private int use;

    @Override
    public String toString() {
        return "FileLinks{" +
                "id=" + id +
                ", filelink='" + filelink + '\'' +
                ", linkpassword='" + linkpassword + '\'' +
                ", use=" + use +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFilelink() {
        return filelink;
    }

    public void setFilelink(String filelink) {
        this.filelink = filelink;
    }

    public String getLinkpassword() {
        return linkpassword;
    }

    public void setLinkpassword(String linkpassword) {
        this.linkpassword = linkpassword;
    }

    public int getUse() {
        return use;
    }

    public void setUse(int use) {
        this.use = use;
    }
}
