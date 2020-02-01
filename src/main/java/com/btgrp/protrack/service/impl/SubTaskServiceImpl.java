package com.btgrp.protrack.service.impl;

import com.btgrp.protrack.service.SubTaskService;
import com.btgrp.protrack.domain.SubTask;
import com.btgrp.protrack.repository.SubTaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link SubTask}.
 */
@Service
@Transactional
public class SubTaskServiceImpl implements SubTaskService {

    private final Logger log = LoggerFactory.getLogger(SubTaskServiceImpl.class);

    private final SubTaskRepository subTaskRepository;

    public SubTaskServiceImpl(SubTaskRepository subTaskRepository) {
        this.subTaskRepository = subTaskRepository;
    }

    /**
     * Save a subTask.
     *
     * @param subTask the entity to save.
     * @return the persisted entity.
     */
    @Override
    public SubTask save(SubTask subTask) {
        log.debug("Request to save SubTask : {}", subTask);
        return subTaskRepository.save(subTask);
    }

    /**
     * Get all the subTasks.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SubTask> findAll(Pageable pageable) {
        log.debug("Request to get all SubTasks");
        return subTaskRepository.findAll(pageable);
    }


    /**
     * Get one subTask by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SubTask> findOne(Long id) {
        log.debug("Request to get SubTask : {}", id);
        return subTaskRepository.findById(id);
    }

    /**
     * Delete the subTask by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SubTask : {}", id);
        subTaskRepository.deleteById(id);
    }
}
