package com.zf.service.impl;

import com.zf.mapper.FileMapper;
import com.zf.mapper.UserMapper;
import com.zf.pojo.File;
import com.zf.pojo.User;
import com.zf.service.IFileService;
import com.zf.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public class FileService implements IFileService {

    @Autowired
    private FileMapper fileMapper;


    @Override
    public List<File> getAll() {
        return fileMapper.getAll();
    }

    @Override
    public File get(File file) {
        return fileMapper.get(file);
    }

    @Override
    public void insert(File file) {
        fileMapper.insert(file);
    }

    @Override
    public void delete(Integer id) {
        fileMapper.delete(id);
    }

    @Override
    public void update(File file) {
        fileMapper.update(file);
    }
}
