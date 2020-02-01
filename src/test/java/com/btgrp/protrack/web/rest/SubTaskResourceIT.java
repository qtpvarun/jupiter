package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.ProTrackApp;
import com.btgrp.protrack.domain.SubTask;
import com.btgrp.protrack.repository.SubTaskRepository;
import com.btgrp.protrack.service.SubTaskService;
import com.btgrp.protrack.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.btgrp.protrack.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.btgrp.protrack.domain.enumeration.SubTaskStatus;
import com.btgrp.protrack.domain.enumeration.Priority;
/**
 * Integration tests for the {@link SubTaskResource} REST controller.
 */
@SpringBootTest(classes = ProTrackApp.class)
public class SubTaskResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final SubTaskStatus DEFAULT_STATUS = SubTaskStatus.Open;
    private static final SubTaskStatus UPDATED_STATUS = SubTaskStatus.Closed;

    private static final Instant DEFAULT_ASSIGNED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ASSIGNED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_ESTIMATED_COMPLETION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ESTIMATED_COMPLETION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_CLOSED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CLOSED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Priority DEFAULT_PRIORITY = Priority.Low;
    private static final Priority UPDATED_PRIORITY = Priority.Medium;

    private static final Boolean DEFAULT_IS_OVERDUE = false;
    private static final Boolean UPDATED_IS_OVERDUE = true;

    private static final Boolean DEFAULT_IN_PROGRESS = false;
    private static final Boolean UPDATED_IN_PROGRESS = true;

    @Autowired
    private SubTaskRepository subTaskRepository;

    @Autowired
    private SubTaskService subTaskService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSubTaskMockMvc;

    private SubTask subTask;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubTaskResource subTaskResource = new SubTaskResource(subTaskService);
        this.restSubTaskMockMvc = MockMvcBuilders.standaloneSetup(subTaskResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubTask createEntity(EntityManager em) {
        SubTask subTask = new SubTask()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .status(DEFAULT_STATUS)
            .assignedDate(DEFAULT_ASSIGNED_DATE)
            .estimatedCompletionDate(DEFAULT_ESTIMATED_COMPLETION_DATE)
            .closedDate(DEFAULT_CLOSED_DATE)
            .priority(DEFAULT_PRIORITY)
            .isOverdue(DEFAULT_IS_OVERDUE)
            .inProgress(DEFAULT_IN_PROGRESS);
        return subTask;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubTask createUpdatedEntity(EntityManager em) {
        SubTask subTask = new SubTask()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .status(UPDATED_STATUS)
            .assignedDate(UPDATED_ASSIGNED_DATE)
            .estimatedCompletionDate(UPDATED_ESTIMATED_COMPLETION_DATE)
            .closedDate(UPDATED_CLOSED_DATE)
            .priority(UPDATED_PRIORITY)
            .isOverdue(UPDATED_IS_OVERDUE)
            .inProgress(UPDATED_IN_PROGRESS);
        return subTask;
    }

    @BeforeEach
    public void initTest() {
        subTask = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubTask() throws Exception {
        int databaseSizeBeforeCreate = subTaskRepository.findAll().size();

        // Create the SubTask
        restSubTaskMockMvc.perform(post("/api/sub-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subTask)))
            .andExpect(status().isCreated());

        // Validate the SubTask in the database
        List<SubTask> subTaskList = subTaskRepository.findAll();
        assertThat(subTaskList).hasSize(databaseSizeBeforeCreate + 1);
        SubTask testSubTask = subTaskList.get(subTaskList.size() - 1);
        assertThat(testSubTask.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSubTask.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testSubTask.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testSubTask.getAssignedDate()).isEqualTo(DEFAULT_ASSIGNED_DATE);
        assertThat(testSubTask.getEstimatedCompletionDate()).isEqualTo(DEFAULT_ESTIMATED_COMPLETION_DATE);
        assertThat(testSubTask.getClosedDate()).isEqualTo(DEFAULT_CLOSED_DATE);
        assertThat(testSubTask.getPriority()).isEqualTo(DEFAULT_PRIORITY);
        assertThat(testSubTask.isIsOverdue()).isEqualTo(DEFAULT_IS_OVERDUE);
        assertThat(testSubTask.isInProgress()).isEqualTo(DEFAULT_IN_PROGRESS);
    }

    @Test
    @Transactional
    public void createSubTaskWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subTaskRepository.findAll().size();

        // Create the SubTask with an existing ID
        subTask.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubTaskMockMvc.perform(post("/api/sub-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subTask)))
            .andExpect(status().isBadRequest());

        // Validate the SubTask in the database
        List<SubTask> subTaskList = subTaskRepository.findAll();
        assertThat(subTaskList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = subTaskRepository.findAll().size();
        // set the field null
        subTask.setName(null);

        // Create the SubTask, which fails.

        restSubTaskMockMvc.perform(post("/api/sub-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subTask)))
            .andExpect(status().isBadRequest());

        List<SubTask> subTaskList = subTaskRepository.findAll();
        assertThat(subTaskList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSubTasks() throws Exception {
        // Initialize the database
        subTaskRepository.saveAndFlush(subTask);

        // Get all the subTaskList
        restSubTaskMockMvc.perform(get("/api/sub-tasks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subTask.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].assignedDate").value(hasItem(DEFAULT_ASSIGNED_DATE.toString())))
            .andExpect(jsonPath("$.[*].estimatedCompletionDate").value(hasItem(DEFAULT_ESTIMATED_COMPLETION_DATE.toString())))
            .andExpect(jsonPath("$.[*].closedDate").value(hasItem(DEFAULT_CLOSED_DATE.toString())))
            .andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY.toString())))
            .andExpect(jsonPath("$.[*].isOverdue").value(hasItem(DEFAULT_IS_OVERDUE.booleanValue())))
            .andExpect(jsonPath("$.[*].inProgress").value(hasItem(DEFAULT_IN_PROGRESS.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getSubTask() throws Exception {
        // Initialize the database
        subTaskRepository.saveAndFlush(subTask);

        // Get the subTask
        restSubTaskMockMvc.perform(get("/api/sub-tasks/{id}", subTask.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subTask.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.assignedDate").value(DEFAULT_ASSIGNED_DATE.toString()))
            .andExpect(jsonPath("$.estimatedCompletionDate").value(DEFAULT_ESTIMATED_COMPLETION_DATE.toString()))
            .andExpect(jsonPath("$.closedDate").value(DEFAULT_CLOSED_DATE.toString()))
            .andExpect(jsonPath("$.priority").value(DEFAULT_PRIORITY.toString()))
            .andExpect(jsonPath("$.isOverdue").value(DEFAULT_IS_OVERDUE.booleanValue()))
            .andExpect(jsonPath("$.inProgress").value(DEFAULT_IN_PROGRESS.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSubTask() throws Exception {
        // Get the subTask
        restSubTaskMockMvc.perform(get("/api/sub-tasks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubTask() throws Exception {
        // Initialize the database
        subTaskService.save(subTask);

        int databaseSizeBeforeUpdate = subTaskRepository.findAll().size();

        // Update the subTask
        SubTask updatedSubTask = subTaskRepository.findById(subTask.getId()).get();
        // Disconnect from session so that the updates on updatedSubTask are not directly saved in db
        em.detach(updatedSubTask);
        updatedSubTask
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .status(UPDATED_STATUS)
            .assignedDate(UPDATED_ASSIGNED_DATE)
            .estimatedCompletionDate(UPDATED_ESTIMATED_COMPLETION_DATE)
            .closedDate(UPDATED_CLOSED_DATE)
            .priority(UPDATED_PRIORITY)
            .isOverdue(UPDATED_IS_OVERDUE)
            .inProgress(UPDATED_IN_PROGRESS);

        restSubTaskMockMvc.perform(put("/api/sub-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubTask)))
            .andExpect(status().isOk());

        // Validate the SubTask in the database
        List<SubTask> subTaskList = subTaskRepository.findAll();
        assertThat(subTaskList).hasSize(databaseSizeBeforeUpdate);
        SubTask testSubTask = subTaskList.get(subTaskList.size() - 1);
        assertThat(testSubTask.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSubTask.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testSubTask.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testSubTask.getAssignedDate()).isEqualTo(UPDATED_ASSIGNED_DATE);
        assertThat(testSubTask.getEstimatedCompletionDate()).isEqualTo(UPDATED_ESTIMATED_COMPLETION_DATE);
        assertThat(testSubTask.getClosedDate()).isEqualTo(UPDATED_CLOSED_DATE);
        assertThat(testSubTask.getPriority()).isEqualTo(UPDATED_PRIORITY);
        assertThat(testSubTask.isIsOverdue()).isEqualTo(UPDATED_IS_OVERDUE);
        assertThat(testSubTask.isInProgress()).isEqualTo(UPDATED_IN_PROGRESS);
    }

    @Test
    @Transactional
    public void updateNonExistingSubTask() throws Exception {
        int databaseSizeBeforeUpdate = subTaskRepository.findAll().size();

        // Create the SubTask

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubTaskMockMvc.perform(put("/api/sub-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subTask)))
            .andExpect(status().isBadRequest());

        // Validate the SubTask in the database
        List<SubTask> subTaskList = subTaskRepository.findAll();
        assertThat(subTaskList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubTask() throws Exception {
        // Initialize the database
        subTaskService.save(subTask);

        int databaseSizeBeforeDelete = subTaskRepository.findAll().size();

        // Delete the subTask
        restSubTaskMockMvc.perform(delete("/api/sub-tasks/{id}", subTask.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SubTask> subTaskList = subTaskRepository.findAll();
        assertThat(subTaskList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
