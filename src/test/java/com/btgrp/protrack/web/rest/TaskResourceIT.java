package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.ProTrackApp;
import com.btgrp.protrack.domain.Task;
import com.btgrp.protrack.repository.TaskRepository;
import com.btgrp.protrack.service.TaskService;
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

import com.btgrp.protrack.domain.enumeration.TaskStatus;
import com.btgrp.protrack.domain.enumeration.Priority;
import com.btgrp.protrack.domain.enumeration.Grade;
/**
 * Integration tests for the {@link TaskResource} REST controller.
 */
@SpringBootTest(classes = ProTrackApp.class)
public class TaskResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_ERP_PROJECT_ID = "AAAAAAAAAA";
    private static final String UPDATED_ERP_PROJECT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_ERP_PROJECT_SEQUENCE = "AAAAAAAAAA";
    private static final String UPDATED_ERP_PROJECT_SEQUENCE = "BBBBBBBBBB";

    private static final String DEFAULT_ERP_PROJECT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_ERP_PROJECT_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_ERP_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_ERP_STATUS = "BBBBBBBBBB";

    private static final TaskStatus DEFAULT_STATUS = TaskStatus.Open;
    private static final TaskStatus UPDATED_STATUS = TaskStatus.Closed;

    private static final String DEFAULT_ASSIGNED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_ASSIGNED_DATE = "BBBBBBBBBB";

    private static final Instant DEFAULT_ESTIMATED_COMPLETION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ESTIMATED_COMPLETION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_COMPLETED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_COMPLETED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DRAFT_DUE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DRAFT_DUE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_INTERNAL_DUE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_INTERNAL_DUE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Priority DEFAULT_PRIORITY = Priority.Low;
    private static final Priority UPDATED_PRIORITY = Priority.Medium;

    private static final Boolean DEFAULT_IS_OVERDUE = false;
    private static final Boolean UPDATED_IS_OVERDUE = true;

    private static final Boolean DEFAULT_IN_PROGRESS = false;
    private static final Boolean UPDATED_IN_PROGRESS = true;

    private static final Grade DEFAULT_GRADE = Grade.A;
    private static final Grade UPDATED_GRADE = Grade.B;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskService taskService;

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

    private MockMvc restTaskMockMvc;

    private Task task;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TaskResource taskResource = new TaskResource(taskService);
        this.restTaskMockMvc = MockMvcBuilders.standaloneSetup(taskResource)
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
    public static Task createEntity(EntityManager em) {
        Task task = new Task()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .erpProjectID(DEFAULT_ERP_PROJECT_ID)
            .erpProjectSequence(DEFAULT_ERP_PROJECT_SEQUENCE)
            .erpProjectType(DEFAULT_ERP_PROJECT_TYPE)
            .erpStatus(DEFAULT_ERP_STATUS)
            .status(DEFAULT_STATUS)
            .assignedDate(DEFAULT_ASSIGNED_DATE)
            .estimatedCompletionDate(DEFAULT_ESTIMATED_COMPLETION_DATE)
            .completedDate(DEFAULT_COMPLETED_DATE)
            .draftDueDate(DEFAULT_DRAFT_DUE_DATE)
            .internalDueDate(DEFAULT_INTERNAL_DUE_DATE)
            .priority(DEFAULT_PRIORITY)
            .isOverdue(DEFAULT_IS_OVERDUE)
            .inProgress(DEFAULT_IN_PROGRESS)
            .grade(DEFAULT_GRADE);
        return task;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Task createUpdatedEntity(EntityManager em) {
        Task task = new Task()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .erpProjectID(UPDATED_ERP_PROJECT_ID)
            .erpProjectSequence(UPDATED_ERP_PROJECT_SEQUENCE)
            .erpProjectType(UPDATED_ERP_PROJECT_TYPE)
            .erpStatus(UPDATED_ERP_STATUS)
            .status(UPDATED_STATUS)
            .assignedDate(UPDATED_ASSIGNED_DATE)
            .estimatedCompletionDate(UPDATED_ESTIMATED_COMPLETION_DATE)
            .completedDate(UPDATED_COMPLETED_DATE)
            .draftDueDate(UPDATED_DRAFT_DUE_DATE)
            .internalDueDate(UPDATED_INTERNAL_DUE_DATE)
            .priority(UPDATED_PRIORITY)
            .isOverdue(UPDATED_IS_OVERDUE)
            .inProgress(UPDATED_IN_PROGRESS)
            .grade(UPDATED_GRADE);
        return task;
    }

    @BeforeEach
    public void initTest() {
        task = createEntity(em);
    }

    @Test
    @Transactional
    public void createTask() throws Exception {
        int databaseSizeBeforeCreate = taskRepository.findAll().size();

        // Create the Task
        restTaskMockMvc.perform(post("/api/tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(task)))
            .andExpect(status().isCreated());

        // Validate the Task in the database
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeCreate + 1);
        Task testTask = taskList.get(taskList.size() - 1);
        assertThat(testTask.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTask.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTask.getErpProjectID()).isEqualTo(DEFAULT_ERP_PROJECT_ID);
        assertThat(testTask.getErpProjectSequence()).isEqualTo(DEFAULT_ERP_PROJECT_SEQUENCE);
        assertThat(testTask.getErpProjectType()).isEqualTo(DEFAULT_ERP_PROJECT_TYPE);
        assertThat(testTask.getErpStatus()).isEqualTo(DEFAULT_ERP_STATUS);
        assertThat(testTask.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testTask.getAssignedDate()).isEqualTo(DEFAULT_ASSIGNED_DATE);
        assertThat(testTask.getEstimatedCompletionDate()).isEqualTo(DEFAULT_ESTIMATED_COMPLETION_DATE);
        assertThat(testTask.getCompletedDate()).isEqualTo(DEFAULT_COMPLETED_DATE);
        assertThat(testTask.getDraftDueDate()).isEqualTo(DEFAULT_DRAFT_DUE_DATE);
        assertThat(testTask.getInternalDueDate()).isEqualTo(DEFAULT_INTERNAL_DUE_DATE);
        assertThat(testTask.getPriority()).isEqualTo(DEFAULT_PRIORITY);
        assertThat(testTask.isIsOverdue()).isEqualTo(DEFAULT_IS_OVERDUE);
        assertThat(testTask.isInProgress()).isEqualTo(DEFAULT_IN_PROGRESS);
        assertThat(testTask.getGrade()).isEqualTo(DEFAULT_GRADE);
    }

    @Test
    @Transactional
    public void createTaskWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = taskRepository.findAll().size();

        // Create the Task with an existing ID
        task.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaskMockMvc.perform(post("/api/tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(task)))
            .andExpect(status().isBadRequest());

        // Validate the Task in the database
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskRepository.findAll().size();
        // set the field null
        task.setName(null);

        // Create the Task, which fails.

        restTaskMockMvc.perform(post("/api/tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(task)))
            .andExpect(status().isBadRequest());

        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTasks() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList
        restTaskMockMvc.perform(get("/api/tasks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(task.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].erpProjectID").value(hasItem(DEFAULT_ERP_PROJECT_ID)))
            .andExpect(jsonPath("$.[*].erpProjectSequence").value(hasItem(DEFAULT_ERP_PROJECT_SEQUENCE)))
            .andExpect(jsonPath("$.[*].erpProjectType").value(hasItem(DEFAULT_ERP_PROJECT_TYPE)))
            .andExpect(jsonPath("$.[*].erpStatus").value(hasItem(DEFAULT_ERP_STATUS)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].assignedDate").value(hasItem(DEFAULT_ASSIGNED_DATE)))
            .andExpect(jsonPath("$.[*].estimatedCompletionDate").value(hasItem(DEFAULT_ESTIMATED_COMPLETION_DATE.toString())))
            .andExpect(jsonPath("$.[*].completedDate").value(hasItem(DEFAULT_COMPLETED_DATE.toString())))
            .andExpect(jsonPath("$.[*].draftDueDate").value(hasItem(DEFAULT_DRAFT_DUE_DATE.toString())))
            .andExpect(jsonPath("$.[*].internalDueDate").value(hasItem(DEFAULT_INTERNAL_DUE_DATE.toString())))
            .andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY.toString())))
            .andExpect(jsonPath("$.[*].isOverdue").value(hasItem(DEFAULT_IS_OVERDUE.booleanValue())))
            .andExpect(jsonPath("$.[*].inProgress").value(hasItem(DEFAULT_IN_PROGRESS.booleanValue())))
            .andExpect(jsonPath("$.[*].grade").value(hasItem(DEFAULT_GRADE.toString())));
    }
    
    @Test
    @Transactional
    public void getTask() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get the task
        restTaskMockMvc.perform(get("/api/tasks/{id}", task.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(task.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.erpProjectID").value(DEFAULT_ERP_PROJECT_ID))
            .andExpect(jsonPath("$.erpProjectSequence").value(DEFAULT_ERP_PROJECT_SEQUENCE))
            .andExpect(jsonPath("$.erpProjectType").value(DEFAULT_ERP_PROJECT_TYPE))
            .andExpect(jsonPath("$.erpStatus").value(DEFAULT_ERP_STATUS))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.assignedDate").value(DEFAULT_ASSIGNED_DATE))
            .andExpect(jsonPath("$.estimatedCompletionDate").value(DEFAULT_ESTIMATED_COMPLETION_DATE.toString()))
            .andExpect(jsonPath("$.completedDate").value(DEFAULT_COMPLETED_DATE.toString()))
            .andExpect(jsonPath("$.draftDueDate").value(DEFAULT_DRAFT_DUE_DATE.toString()))
            .andExpect(jsonPath("$.internalDueDate").value(DEFAULT_INTERNAL_DUE_DATE.toString()))
            .andExpect(jsonPath("$.priority").value(DEFAULT_PRIORITY.toString()))
            .andExpect(jsonPath("$.isOverdue").value(DEFAULT_IS_OVERDUE.booleanValue()))
            .andExpect(jsonPath("$.inProgress").value(DEFAULT_IN_PROGRESS.booleanValue()))
            .andExpect(jsonPath("$.grade").value(DEFAULT_GRADE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTask() throws Exception {
        // Get the task
        restTaskMockMvc.perform(get("/api/tasks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTask() throws Exception {
        // Initialize the database
        taskService.save(task);

        int databaseSizeBeforeUpdate = taskRepository.findAll().size();

        // Update the task
        Task updatedTask = taskRepository.findById(task.getId()).get();
        // Disconnect from session so that the updates on updatedTask are not directly saved in db
        em.detach(updatedTask);
        updatedTask
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .erpProjectID(UPDATED_ERP_PROJECT_ID)
            .erpProjectSequence(UPDATED_ERP_PROJECT_SEQUENCE)
            .erpProjectType(UPDATED_ERP_PROJECT_TYPE)
            .erpStatus(UPDATED_ERP_STATUS)
            .status(UPDATED_STATUS)
            .assignedDate(UPDATED_ASSIGNED_DATE)
            .estimatedCompletionDate(UPDATED_ESTIMATED_COMPLETION_DATE)
            .completedDate(UPDATED_COMPLETED_DATE)
            .draftDueDate(UPDATED_DRAFT_DUE_DATE)
            .internalDueDate(UPDATED_INTERNAL_DUE_DATE)
            .priority(UPDATED_PRIORITY)
            .isOverdue(UPDATED_IS_OVERDUE)
            .inProgress(UPDATED_IN_PROGRESS)
            .grade(UPDATED_GRADE);

        restTaskMockMvc.perform(put("/api/tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTask)))
            .andExpect(status().isOk());

        // Validate the Task in the database
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeUpdate);
        Task testTask = taskList.get(taskList.size() - 1);
        assertThat(testTask.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTask.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTask.getErpProjectID()).isEqualTo(UPDATED_ERP_PROJECT_ID);
        assertThat(testTask.getErpProjectSequence()).isEqualTo(UPDATED_ERP_PROJECT_SEQUENCE);
        assertThat(testTask.getErpProjectType()).isEqualTo(UPDATED_ERP_PROJECT_TYPE);
        assertThat(testTask.getErpStatus()).isEqualTo(UPDATED_ERP_STATUS);
        assertThat(testTask.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testTask.getAssignedDate()).isEqualTo(UPDATED_ASSIGNED_DATE);
        assertThat(testTask.getEstimatedCompletionDate()).isEqualTo(UPDATED_ESTIMATED_COMPLETION_DATE);
        assertThat(testTask.getCompletedDate()).isEqualTo(UPDATED_COMPLETED_DATE);
        assertThat(testTask.getDraftDueDate()).isEqualTo(UPDATED_DRAFT_DUE_DATE);
        assertThat(testTask.getInternalDueDate()).isEqualTo(UPDATED_INTERNAL_DUE_DATE);
        assertThat(testTask.getPriority()).isEqualTo(UPDATED_PRIORITY);
        assertThat(testTask.isIsOverdue()).isEqualTo(UPDATED_IS_OVERDUE);
        assertThat(testTask.isInProgress()).isEqualTo(UPDATED_IN_PROGRESS);
        assertThat(testTask.getGrade()).isEqualTo(UPDATED_GRADE);
    }

    @Test
    @Transactional
    public void updateNonExistingTask() throws Exception {
        int databaseSizeBeforeUpdate = taskRepository.findAll().size();

        // Create the Task

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskMockMvc.perform(put("/api/tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(task)))
            .andExpect(status().isBadRequest());

        // Validate the Task in the database
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTask() throws Exception {
        // Initialize the database
        taskService.save(task);

        int databaseSizeBeforeDelete = taskRepository.findAll().size();

        // Delete the task
        restTaskMockMvc.perform(delete("/api/tasks/{id}", task.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
