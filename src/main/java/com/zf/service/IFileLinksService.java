package com.zf.service;

import com.zf.pojo.FileLinks;

import java.util.List;

public interface IFileLinksService {

    FileLinks get(FileLinks fileLinks);

    void insert(FileLinks fileLinks);

    void delete(Integer id);

}
