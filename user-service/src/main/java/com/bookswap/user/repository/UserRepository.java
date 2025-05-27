package com.bookswap.user.repository;

import com.bookswap.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    
    @Query("{'interests': {$in: [?0]}}")
    Page<User> findByInterests(String interest, Pageable pageable);
    
    @Query("{'location': ?0}")
    Page<User> findByLocation(String location, Pageable pageable);
    
    @Query("{'$or': [{'username': {$regex: ?0, $options: 'i'}}, {'firstName': {$regex: ?0, $options: 'i'}}, {'lastName': {$regex: ?0, $options: 'i'}}]}")
    Page<User> searchUsers(String keyword, Pageable pageable);
}