package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.ProTrackApp;
import com.btgrp.protrack.domain.TaskHistory;
import com.btgrp.protrack.repository.TaskHistoryRepository;
import com.btgrp.protrack.service.TaskHistoryService;
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

import com.btgrp.protrack.domain.enumeration.EventType;
/**
 * Integration tests for the {@link TaskHistoryResource} REST controller.
 */
@SpringBootTest(classes = ProTrackApp.class)
public class TaskHistoryResourceIT {

    private static final Instant DEFAULT_EVENT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_EVENT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final EventType DEFAULT_EVENT_TYPE = EventType.Change;
    private static final EventType UPDATED_EVENT_TYPE = EventType.Message;

    private static final String DEFAULT_EVENT_TOPIC = "AAAAAAAAAA";
    private static final String UPDATED_EVENT_TOPIC = "BBBBBBBBBB";

    private static final String DEFAULT_EVENT_DETAIL = "AAAAAAAAAA";
    private static final String UPDATED_EVENT_DETAIL = "BBBBBBBBBB";

    private static final String DEFAULT_REDLINE = "AAAAAAAAAA";
    private static final String UPDATED_REDLINE = "BBBBBBBBBB";

    @Autowired
    private TaskHistoryRepository taskHistoryRepository;

    @Autowired
    private TaskHistoryService taskHistoryService;

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

    private MockMvc restTaskHistoryMockMvc;

    private TaskHistory taskHistory;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TaskHistoryResource taskHistoryResource = new TaskHistoryResource(taskHistoryService);
        this.restTaskHistoryMockMvc = MockMvcBuilders.standaloneSetup(taskHistoryResource)
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
    public static TaskHistory createEntity(EntityManager em) {
        TaskHistory taskHistory = new TaskHistory()
            .eventDate(DEFAULT_EVENT_DATE)
            .eventType(DEFAULT_EVENT_TYPE)
            .eventTopic(DEFAULT_EVENT_TOPIC)
            .eventDetail(DEFAULT_EVENT_DETAIL)
            .redline(DEFAULT_REDLINE);
        return taskHistory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskHistory createUpdatedEntity(EntityManager em) {
        TaskHistory taskHistory = new TaskHistory()
            .eventDate(UPDATED_EVENT_DATE)
            .eventType(UPDATED_EVENT_TYPE)
            .eventTopic(UPDATED_EVENT_TOPIC)
            .eventDetail(UPDATED_EVENT_DETAIL)
            .redline(UPDATED_REDLINE);
        return taskHistory;
    }

    @BeforeEach
    public void initTest() {
        taskHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createTaskHistory() throws Exception {
        int databaseSizeBeforeCreate = taskHistoryRepository.findAll().size();

        // Create the TaskHistory
        restTaskHistoryMockMvc.perform(post("/api/task-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskHistory)))
            .andExpect(status().isCreated());

        // Validate the TaskHistory in the database
        List<TaskHistory> taskHistoryList = taskHistoryRepository.findAll();
        assertThat(taskHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        TaskHistory testTaskHistory = taskHistoryList.get(taskHistoryList.size() - 1);
        assertThat(testTaskHistory.getEventDate()).isEqualTo(DEFAULT_EVENT_DATE);
        assertThat(testTaskHistory.getEventType()).isEqualTo(DEFAULT_EVENT_TYPE);
        assertThat(testTaskHistory.getEventTopic()).isEqualTo(DEFAULT_EVENT_TOPIC);
        assertThat(testTaskHistory.getEventDetail()).isEqualTo(DEFAULT_EVENT_DETAIL);
        assertThat(testTaskHistory.getRedline()).isEqualTo(DEFAULT_REDLINE);
    }

    @Test
    @Transactional
    public void createTaskHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = taskHistoryRepository.findAll().size();

        // Create the TaskHistory with an existing ID
        taskHistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaskHistoryMockMvc.perform(post("/api/task-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskHistory)))
            .andExpect(status().isBadRequest());

        // Validate the TaskHistory in the database
        List<TaskHistory> taskHistoryList = taskHistoryRepository.findAll();
        assertThat(taskHistoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTaskHistories() throws Exception {
        // Initialize the database
        taskHistoryRepository.saveAndFlush(taskHistory);

        // Get all the taskHistoryList
        restTaskHistoryMockMvc.perform(get("/api/task-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taskHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].eventDate").value(hasItem(DEFAULT_EVENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].eventType").value(hasItem(DEFAULT_EVENT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].eventTopic").value(hasItem(DEFAULT_EVENT_TOPIC)))
            .andExpect(jsonPath("$.[*].eventDetail").value(hasItem(DEFAULT_EVENT_DETAIL)))
            .andExpect(jsonPath("$.[*].redline").value(hasItem(DEFAULT_REDLINE)));
    }
    
    @Test
    @Transactional
    public void getTaskHistory() throws Exception {
        // Initialize the database
        taskHistoryRepository.saveAndFlush(taskHistory);

        // Get the taskHistory
        restTaskHistoryMockMvc.perform(get("/api/task-histories/{id}", taskHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(taskHistory.getId().intValue()))
            .andExpect(jsonPath("$.eventDate").value(DEFAULT_EVENT_DATE.toString()))
            .andExpect(jsonPath("$.eventType").value(DEFAULT_EVENT_TYPE.toString()))
            .andExpect(jsonPath("$.eventTopic").value(DEFAULT_EVENT_TOPIC))
            .andExpect(jsonPath("$.eventDetail").value(DEFAULT_EVENT_DETAIL))
            .andExpect(jsonPath("$.redline").value(DEFAULT_REDLINE));
    }

    @Test
    @Transactional
    public void getNonExistingTaskHistory() throws Exception {
        // Get the taskHistory
        restTaskHistoryMockMvc.perform(get("/api/task-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTaskHistory() throws Exception {
        // Initialize the database
        taskHistoryService.save(taskHistory);

        int databaseSizeBeforeUpdate = taskHistoryRepository.findAll().size();

        // Update the taskHistory
        TaskHistory updatedTaskHistory = taskHistoryRepository.findById(taskHistory.getId()).get();
        // Disconnect from session so that the updates on updatedTaskHistory are not directly saved in db
        em.detach(updatedTaskHistory);
        updatedTaskHistory
            .eventDate(UPDATED_EVENT_DATE)
            .eventType(UPDATED_EVENT_TYPE)
            .eventTopic(UPDATED_EVENT_TOPIC)
            .eventDetail(UPDATED_EVENT_DETAIL)
            .redline(UPDATED_REDLINE);

        restTaskHistoryMockMvc.perform(put("/api/task-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTaskHistory)))
            .andExpect(status().isOk());

        // Validate the TaskHistory in the database
        List<TaskHistory> taskHistoryList = taskHistoryRepository.findAll();
        assertThat(taskHistoryList).hasSize(databaseSizeBeforeUpdate);
        TaskHistory testTaskHistory = taskHistoryList.get(taskHistoryList.size() - 1);
        assertThat(testTaskHistory.getEventDate()).isEqualTo(UPDATED_EVENT_DATE);
        assertThat(testTaskHistory.getEventType()).isEqualTo(UPDATED_EVENT_TYPE);
        assertThat(testTaskHistory.getEventTopic()).isEqualTo(UPDATED_EVENT_TOPIC);
        assertThat(testTaskHistory.getEventDetail()).isEqualTo(UPDATED_EVENT_DETAIL);
        assertThat(testTaskHistory.getRedline()).isEqualTo(UPDATED_REDLINE);
    }

    @Test
    @Transactional
    public void updateNonExistingTaskHistory() throws Exception {
        int databaseSizeBeforeUpdate = taskHistoryRepository.findAll().size();

        // Create the TaskHistory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskHistoryMockMvc.perform(put("/api/task-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskHistory)))
            .andExpect(status().isBadRequest());

        // Validate the TaskHistory in the database
        List<TaskHistory> taskHistoryList = taskHistoryRepository.findAll();
        assertThat(taskHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTaskHistory() throws Exception {
        // Initialize the database
        taskHistoryService.save(taskHistory);

        int databaseSizeBeforeDelete = taskHistoryRepository.findAll().size();

        // Delete the taskHistory
        restTaskHistoryMockMvc.perform(delete("/api/task-histories/{id}", taskHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TaskHistory> taskHistoryList = taskHistoryRepository.findAll();
        assertThat(taskHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
