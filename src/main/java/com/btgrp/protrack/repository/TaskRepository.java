package com.btgrp.protrack.repository;

import com.btgrp.protrack.domain.Task;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Task entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("select task from Task task where task.assignedTo.login = ?#{principal.username}")
    List<Task> findByAssignedToIsCurrentUser();

    @Query("select task from Task task where task.assignedBy.login = ?#{principal.username}")
    List<Task> findByAssignedByIsCurrentUser();

    @Query("select task from Task task where task.assignedQC.login = ?#{principal.username}")
    List<Task> findByAssignedQCIsCurrentUser();

}
