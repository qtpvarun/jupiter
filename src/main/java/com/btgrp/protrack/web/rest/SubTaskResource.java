package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.domain.SubTask;
import com.btgrp.protrack.service.SubTaskService;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.btgrp.protrack.domain.SubTask}.
 */
@RestController
@RequestMapping("/api")
public class SubTaskResource {

    private final Logger log = LoggerFactory.getLogger(SubTaskResource.class);

    private static final String ENTITY_NAME = "subTask";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubTaskService subTaskService;

    public SubTaskResource(SubTaskService subTaskService) {
        this.subTaskService = subTaskService;
    }

    /**
     * {@code POST  /sub-tasks} : Create a new subTask.
     *
     * @param subTask the subTask to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subTask, or with status {@code 400 (Bad Request)} if the subTask has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sub-tasks")
    public ResponseEntity<SubTask> createSubTask(@Valid @RequestBody SubTask subTask) throws URISyntaxException {
        log.debug("REST request to save SubTask : {}", subTask);
        if (subTask.getId() != null) {
            throw new BadRequestAlertException("A new subTask cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubTask result = subTaskService.save(subTask);
        return ResponseEntity.created(new URI("/api/sub-tasks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sub-tasks} : Updates an existing subTask.
     *
     * @param subTask the subTask to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subTask,
     * or with status {@code 400 (Bad Request)} if the subTask is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subTask couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sub-tasks")
    public ResponseEntity<SubTask> updateSubTask(@Valid @RequestBody SubTask subTask) throws URISyntaxException {
        log.debug("REST request to update SubTask : {}", subTask);
        if (subTask.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubTask result = subTaskService.save(subTask);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subTask.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sub-tasks} : get all the subTasks.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subTasks in body.
     */
    @GetMapping("/sub-tasks")
    public ResponseEntity<List<SubTask>> getAllSubTasks(Pageable pageable) {
        log.debug("REST request to get a page of SubTasks");
        Page<SubTask> page = subTaskService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /sub-tasks/:id} : get the "id" subTask.
     *
     * @param id the id of the subTask to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subTask, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sub-tasks/{id}")
    public ResponseEntity<SubTask> getSubTask(@PathVariable Long id) {
        log.debug("REST request to get SubTask : {}", id);
        Optional<SubTask> subTask = subTaskService.findOne(id);
        return ResponseUtil.wrapOrNotFound(subTask);
    }

    /**
     * {@code DELETE  /sub-tasks/:id} : delete the "id" subTask.
     *
     * @param id the id of the subTask to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sub-tasks/{id}")
    public ResponseEntity<Void> deleteSubTask(@PathVariable Long id) {
        log.debug("REST request to delete SubTask : {}", id);
        subTaskService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
