package com.zf.mapper;

import com.zf.pojo.FileLinks;

import java.util.List;

public interface FileLinksMapper {

    FileLinks get(FileLinks fileLinks);


    void insert(FileLinks fileLinks);

    void delete(Integer id);


}
