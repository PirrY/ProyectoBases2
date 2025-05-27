package com.bookswap.user.service;

import com.bookswap.user.dto.CreateUserRequest;
import com.bookswap.user.dto.UpdateUserRequest;
import com.bookswap.user.dto.UserDto;
import com.bookswap.user.entity.User;
import com.bookswap.user.exception.ResourceNotFoundException;
import com.bookswap.user.exception.UserAlreadyExistsException;
import com.bookswap.user.repository.UserRepository;
import com.bookswap.user.util.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserDto createUser(CreateUserRequest request) {
        // Check if username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new UserAlreadyExistsException("Username already exists");
        }

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("Email already exists");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phoneNumber(request.getPhoneNumber())
                .emailVerified(request.isEmailVerified())
                .interests(new ArrayList<>())
                .favoritedBookIds(new ArrayList<>())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        User savedUser = userRepository.save(user);
        return userMapper.toUserDto(savedUser);
    }

    public UserDto getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return userMapper.toUserDto(user);
    }

    public UserDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
        return userMapper.toUserDto(user);
    }

    public Page<UserDto> getAllUsers(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return users.map(userMapper::toUserDto);
    }

    public UserDto updateUser(String id, UpdateUserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        if (request.getFirstName() != null && !request.getFirstName().isEmpty()) {
            user.setFirstName(request.getFirstName());
        }

        if (request.getLastName() != null && !request.getLastName().isEmpty()) {
            user.setLastName(request.getLastName());
        }
        
        if (request.getPhoneNumber() != null) {
            user.setPhoneNumber(request.getPhoneNumber());
        }

        if (request.getBio() != null) {
            user.setBio(request.getBio());
        }

        if (request.getAvatarUrl() != null) {
            user.setAvatarUrl(request.getAvatarUrl());
        }

        if (request.getLocation() != null) {
            user.setLocation(request.getLocation());
        }

        if (request.getInterests() != null) {
            user.setInterests(request.getInterests());
        }

        user.setUpdatedAt(LocalDateTime.now());
        User updatedUser = userRepository.save(user);
        return userMapper.toUserDto(updatedUser);
    }

    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    public UserDto addFavoriteBook(String userId, String bookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        List<String> favoriteBooks = user.getFavoritedBookIds();
        if (favoriteBooks == null) {
            favoriteBooks = new ArrayList<>();
        }

        if (!favoriteBooks.contains(bookId)) {
            favoriteBooks.add(bookId);
            user.setFavoritedBookIds(favoriteBooks);
            user.setUpdatedAt(LocalDateTime.now());
            User updatedUser = userRepository.save(user);
            return userMapper.toUserDto(updatedUser);
        }

        return userMapper.toUserDto(user);
    }

    public UserDto removeFavoriteBook(String userId, String bookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        List<String> favoriteBooks = user.getFavoritedBookIds();
        if (favoriteBooks != null && favoriteBooks.contains(bookId)) {
            favoriteBooks.remove(bookId);
            user.setFavoritedBookIds(favoriteBooks);
            user.setUpdatedAt(LocalDateTime.now());
            User updatedUser = userRepository.save(user);
            return userMapper.toUserDto(updatedUser);
        }

        return userMapper.toUserDto(user);
    }

    public Page<UserDto> searchUsers(String keyword, Pageable pageable) {
        Page<User> users = userRepository.searchUsers(keyword, pageable);
        return users.map(userMapper::toUserDto);
    }

    public Page<UserDto> getUsersByInterest(String interest, Pageable pageable) {
        Page<User> users = userRepository.findByInterests(interest, pageable);
        return users.map(userMapper::toUserDto);
    }

    public Page<UserDto> getUsersByLocation(String location, Pageable pageable) {
        Page<User> users = userRepository.findByLocation(location, pageable);
        return users.map(userMapper::toUserDto);
    }
}