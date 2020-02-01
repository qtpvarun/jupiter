package com.btgrp.protrack.service;

import com.btgrp.protrack.domain.SubTask;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link SubTask}.
 */
public interface SubTaskService {

    /**
     * Save a subTask.
     *
     * @param subTask the entity to save.
     * @return the persisted entity.
     */
    SubTask save(SubTask subTask);

    /**
     * Get all the subTasks.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<SubTask> findAll(Pageable pageable);


    /**
     * Get the "id" subTask.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SubTask> findOne(Long id);

    /**
     * Delete the "id" subTask.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
