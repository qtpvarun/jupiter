package com.btgrp.protrack.service;

import com.btgrp.protrack.domain.TaskHistory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link TaskHistory}.
 */
public interface TaskHistoryService {

    /**
     * Save a taskHistory.
     *
     * @param taskHistory the entity to save.
     * @return the persisted entity.
     */
    TaskHistory save(TaskHistory taskHistory);

    /**
     * Get all the taskHistories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TaskHistory> findAll(Pageable pageable);


    /**
     * Get the "id" taskHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TaskHistory> findOne(Long id);

    /**
     * Delete the "id" taskHistory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
