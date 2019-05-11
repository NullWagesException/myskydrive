package com.zf.pojo;

import java.util.Date;

public class File {

    private Integer id;
    private String username;
    private String filepath;
    private Date date;
    private String filename;

    @Override
    public String toString() {
        return "File{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", filepath='" + filepath + '\'' +
                ", date=" + date +
                ", filename='" + filename + '\'' +
                '}';
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
