package com.btgrp.protrack.repository;

import com.btgrp.protrack.domain.SubTask;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the SubTask entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubTaskRepository extends JpaRepository<SubTask, Long> {

    @Query("select subTask from SubTask subTask where subTask.assignedTo.login = ?#{principal.username}")
    List<SubTask> findByAssignedToIsCurrentUser();

    @Query("select subTask from SubTask subTask where subTask.assignedBy.login = ?#{principal.username}")
    List<SubTask> findByAssignedByIsCurrentUser();

    @Query("select subTask from SubTask subTask where subTask.sourceUser.login = ?#{principal.username}")
    List<SubTask> findBySourceUserIsCurrentUser();

    @Query("select subTask from SubTask subTask where subTask.targetUser.login = ?#{principal.username}")
    List<SubTask> findByTargetUserIsCurrentUser();

}
