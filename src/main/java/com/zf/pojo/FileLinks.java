package com.zf.pojo;

import java.util.Date;

public class FileLinks {

    private Integer id;
    private String filelink;
    private String linkpassword;
    private int isuse;
    private int fileid;

    public int getFileid() {
        return fileid;
    }

    public void setFileid(int fileid) {
        this.fileid = fileid;
    }

    @Override
    public String toString() {
        return "FileLinks{" +
                "id=" + id +
                ", filelink='" + filelink + '\'' +
                ", linkpassword='" + linkpassword + '\'' +
                ", isuse=" + isuse +
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

    public int getIsuse() {
        return isuse;
    }

    public void setIsuse(int isuse) {
        this.isuse = isuse;
    }
}
