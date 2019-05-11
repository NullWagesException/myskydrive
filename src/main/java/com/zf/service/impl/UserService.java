package com.zf.service.impl;

import com.zf.mapper.UserMapper;
import com.zf.pojo.User;
import com.zf.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public class UserService implements IUserService {

    @Autowired
    private UserMapper userMapper;


    @Override
    public List<User> getAll() {
        return userMapper.getAll();
    }

    @Override
    public User getID(User user) {
        return userMapper.getID(user);
    }

    @Override
    public User check(User user) {
        return userMapper.check(user);
    }

    @Override
    public User get(User user) {
        return userMapper.get(user);
    }

    @Override
    public void insert(User user) {
        userMapper.insert(user);
    }

    @Override
    public void delete(Integer id) {
        userMapper.delete(id);
    }

    @Override
    public void update(User user) {
        userMapper.update(user);
    }
}
