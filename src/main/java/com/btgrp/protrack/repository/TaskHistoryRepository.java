package com.btgrp.protrack.repository;

import com.btgrp.protrack.domain.TaskHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TaskHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskHistoryRepository extends JpaRepository<TaskHistory, Long> {

}
