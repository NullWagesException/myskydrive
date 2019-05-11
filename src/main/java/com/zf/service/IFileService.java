package com.zf.service;

import com.zf.pojo.File;

import java.util.List;

public interface IFileService {

    List<File> getAll();

    File get(File file);

    void insert(File file);

    void delete(Integer id);

    void update(File file);

}
