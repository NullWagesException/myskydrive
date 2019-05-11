package com.zf.mapper;

import com.zf.pojo.User;

import java.util.List;

public interface UserMapper {

    User get(User user);

    User getID(User user);

    List<User> getAll();

    User check(User user);

    void insert(User user);

    void delete(Integer id);

    void update(User user);

}
