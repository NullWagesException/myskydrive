package com.zf.service.impl;

import com.zf.mapper.FileLinksMapper;
import com.zf.pojo.FileLinks;
import com.zf.service.IFileLinksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public class FileLinksService implements IFileLinksService {

    @Autowired
    private FileLinksMapper fileLinksMapper;

    @Override
    public FileLinks get(FileLinks fileLinks) {
        return fileLinksMapper.get(fileLinks);
    }

    @Override
    public void insert(FileLinks fileLinks) {
        fileLinksMapper.insert(fileLinks);
    }

    @Override
    public void delete(Integer id) {
        fileLinksMapper.delete(id);
    }

    @Override
    public void update(FileLinks fileLinks) {
        fileLinksMapper.update(fileLinks);
    }

}
