package com.zf.service;

import com.zf.pojo.User;

import java.util.List;

public interface IUserService {

    List<User> getAll();

    User getID(User user);

    User check(User user);

    User get(User user);

    void insert(User user);

    void delete(Integer id);

    void update(User user);

}
