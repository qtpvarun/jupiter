package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.domain.TaskHistory;
import com.btgrp.protrack.service.TaskHistoryService;
import com.btgrp.protrack.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.btgrp.protrack.domain.TaskHistory}.
 */
@RestController
@RequestMapping("/api")
public class TaskHistoryResource {

    private final Logger log = LoggerFactory.getLogger(TaskHistoryResource.class);

    private static final String ENTITY_NAME = "taskHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TaskHistoryService taskHistoryService;

    public TaskHistoryResource(TaskHistoryService taskHistoryService) {
        this.taskHistoryService = taskHistoryService;
    }

    /**
     * {@code POST  /task-histories} : Create a new taskHistory.
     *
     * @param taskHistory the taskHistory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new taskHistory, or with status {@code 400 (Bad Request)} if the taskHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/task-histories")
    public ResponseEntity<TaskHistory> createTaskHistory(@RequestBody TaskHistory taskHistory) throws URISyntaxException {
        log.debug("REST request to save TaskHistory : {}", taskHistory);
        if (taskHistory.getId() != null) {
            throw new BadRequestAlertException("A new taskHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaskHistory result = taskHistoryService.save(taskHistory);
        return ResponseEntity.created(new URI("/api/task-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /task-histories} : Updates an existing taskHistory.
     *
     * @param taskHistory the taskHistory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated taskHistory,
     * or with status {@code 400 (Bad Request)} if the taskHistory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the taskHistory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/task-histories")
    public ResponseEntity<TaskHistory> updateTaskHistory(@RequestBody TaskHistory taskHistory) throws URISyntaxException {
        log.debug("REST request to update TaskHistory : {}", taskHistory);
        if (taskHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TaskHistory result = taskHistoryService.save(taskHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, taskHistory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /task-histories} : get all the taskHistories.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of taskHistories in body.
     */
    @GetMapping("/task-histories")
    public ResponseEntity<List<TaskHistory>> getAllTaskHistories(Pageable pageable) {
        log.debug("REST request to get a page of TaskHistories");
        Page<TaskHistory> page = taskHistoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /task-histories/:id} : get the "id" taskHistory.
     *
     * @param id the id of the taskHistory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the taskHistory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/task-histories/{id}")
    public ResponseEntity<TaskHistory> getTaskHistory(@PathVariable Long id) {
        log.debug("REST request to get TaskHistory : {}", id);
        Optional<TaskHistory> taskHistory = taskHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(taskHistory);
    }

    /**
     * {@code DELETE  /task-histories/:id} : delete the "id" taskHistory.
     *
     * @param id the id of the taskHistory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/task-histories/{id}")
    public ResponseEntity<Void> deleteTaskHistory(@PathVariable Long id) {
        log.debug("REST request to delete TaskHistory : {}", id);
        taskHistoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
