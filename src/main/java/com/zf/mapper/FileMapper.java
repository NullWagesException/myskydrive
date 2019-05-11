package com.zf.mapper;

import com.zf.pojo.File;

import java.util.List;

public interface FileMapper {

    File get(File file);

    List<File> getAll();

    void insert(File file);

    void delete(Integer id);

    void update(File file);

}
