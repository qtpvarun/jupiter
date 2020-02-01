package com.btgrp.protrack.service.impl;

import com.btgrp.protrack.service.TaskHistoryService;
import com.btgrp.protrack.domain.TaskHistory;
import com.btgrp.protrack.repository.TaskHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link TaskHistory}.
 */
@Service
@Transactional
public class TaskHistoryServiceImpl implements TaskHistoryService {

    private final Logger log = LoggerFactory.getLogger(TaskHistoryServiceImpl.class);

    private final TaskHistoryRepository taskHistoryRepository;

    public TaskHistoryServiceImpl(TaskHistoryRepository taskHistoryRepository) {
        this.taskHistoryRepository = taskHistoryRepository;
    }

    /**
     * Save a taskHistory.
     *
     * @param taskHistory the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TaskHistory save(TaskHistory taskHistory) {
        log.debug("Request to save TaskHistory : {}", taskHistory);
        return taskHistoryRepository.save(taskHistory);
    }

    /**
     * Get all the taskHistories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TaskHistory> findAll(Pageable pageable) {
        log.debug("Request to get all TaskHistories");
        return taskHistoryRepository.findAll(pageable);
    }


    /**
     * Get one taskHistory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TaskHistory> findOne(Long id) {
        log.debug("Request to get TaskHistory : {}", id);
        return taskHistoryRepository.findById(id);
    }

    /**
     * Delete the taskHistory by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TaskHistory : {}", id);
        taskHistoryRepository.deleteById(id);
    }
}
