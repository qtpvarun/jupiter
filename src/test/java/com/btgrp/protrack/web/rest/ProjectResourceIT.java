package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.ProTrackApp;
import com.btgrp.protrack.domain.Project;
import com.btgrp.protrack.repository.ProjectRepository;
import com.btgrp.protrack.service.ProjectService;
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

/**
 * Integration tests for the {@link ProjectResource} REST controller.
 */
@SpringBootTest(classes = ProTrackApp.class)
public class ProjectResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_SITE_360 = false;
    private static final Boolean UPDATED_IS_SITE_360 = true;

    private static final Integer DEFAULT_SITE_NUMBER = 1;
    private static final Integer UPDATED_SITE_NUMBER = 2;

    private static final Instant DEFAULT_INTERNAL_DUE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_INTERNAL_DUE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_TOWER_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TOWER_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_P_O_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_P_O_NUMBER = "BBBBBBBBBB";

    private static final Double DEFAULT_TOWER_LATITUDE = 1D;
    private static final Double UPDATED_TOWER_LATITUDE = 2D;

    private static final Double DEFAULT_TOWER_LONGITUDE = 1D;
    private static final Double UPDATED_TOWER_LONGITUDE = 2D;

    private static final String DEFAULT_MEMO = "AAAAAAAAAA";
    private static final String UPDATED_MEMO = "BBBBBBBBBB";

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectService projectService;

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

    private MockMvc restProjectMockMvc;

    private Project project;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProjectResource projectResource = new ProjectResource(projectService);
        this.restProjectMockMvc = MockMvcBuilders.standaloneSetup(projectResource)
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
    public static Project createEntity(EntityManager em) {
        Project project = new Project()
            .name(DEFAULT_NAME)
            .isSite360(DEFAULT_IS_SITE_360)
            .siteNumber(DEFAULT_SITE_NUMBER)
            .internalDue(DEFAULT_INTERNAL_DUE)
            .towerType(DEFAULT_TOWER_TYPE)
            .pONumber(DEFAULT_P_O_NUMBER)
            .towerLatitude(DEFAULT_TOWER_LATITUDE)
            .towerLongitude(DEFAULT_TOWER_LONGITUDE)
            .memo(DEFAULT_MEMO);
        return project;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Project createUpdatedEntity(EntityManager em) {
        Project project = new Project()
            .name(UPDATED_NAME)
            .isSite360(UPDATED_IS_SITE_360)
            .siteNumber(UPDATED_SITE_NUMBER)
            .internalDue(UPDATED_INTERNAL_DUE)
            .towerType(UPDATED_TOWER_TYPE)
            .pONumber(UPDATED_P_O_NUMBER)
            .towerLatitude(UPDATED_TOWER_LATITUDE)
            .towerLongitude(UPDATED_TOWER_LONGITUDE)
            .memo(UPDATED_MEMO);
        return project;
    }

    @BeforeEach
    public void initTest() {
        project = createEntity(em);
    }

    @Test
    @Transactional
    public void createProject() throws Exception {
        int databaseSizeBeforeCreate = projectRepository.findAll().size();

        // Create the Project
        restProjectMockMvc.perform(post("/api/projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(project)))
            .andExpect(status().isCreated());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeCreate + 1);
        Project testProject = projectList.get(projectList.size() - 1);
        assertThat(testProject.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testProject.isIsSite360()).isEqualTo(DEFAULT_IS_SITE_360);
        assertThat(testProject.getSiteNumber()).isEqualTo(DEFAULT_SITE_NUMBER);
        assertThat(testProject.getInternalDue()).isEqualTo(DEFAULT_INTERNAL_DUE);
        assertThat(testProject.getTowerType()).isEqualTo(DEFAULT_TOWER_TYPE);
        assertThat(testProject.getpONumber()).isEqualTo(DEFAULT_P_O_NUMBER);
        assertThat(testProject.getTowerLatitude()).isEqualTo(DEFAULT_TOWER_LATITUDE);
        assertThat(testProject.getTowerLongitude()).isEqualTo(DEFAULT_TOWER_LONGITUDE);
        assertThat(testProject.getMemo()).isEqualTo(DEFAULT_MEMO);
    }

    @Test
    @Transactional
    public void createProjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = projectRepository.findAll().size();

        // Create the Project with an existing ID
        project.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjectMockMvc.perform(post("/api/projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(project)))
            .andExpect(status().isBadRequest());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProjects() throws Exception {
        // Initialize the database
        projectRepository.saveAndFlush(project);

        // Get all the projectList
        restProjectMockMvc.perform(get("/api/projects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(project.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].isSite360").value(hasItem(DEFAULT_IS_SITE_360.booleanValue())))
            .andExpect(jsonPath("$.[*].siteNumber").value(hasItem(DEFAULT_SITE_NUMBER)))
            .andExpect(jsonPath("$.[*].internalDue").value(hasItem(DEFAULT_INTERNAL_DUE.toString())))
            .andExpect(jsonPath("$.[*].towerType").value(hasItem(DEFAULT_TOWER_TYPE)))
            .andExpect(jsonPath("$.[*].pONumber").value(hasItem(DEFAULT_P_O_NUMBER)))
            .andExpect(jsonPath("$.[*].towerLatitude").value(hasItem(DEFAULT_TOWER_LATITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].towerLongitude").value(hasItem(DEFAULT_TOWER_LONGITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].memo").value(hasItem(DEFAULT_MEMO)));
    }
    
    @Test
    @Transactional
    public void getProject() throws Exception {
        // Initialize the database
        projectRepository.saveAndFlush(project);

        // Get the project
        restProjectMockMvc.perform(get("/api/projects/{id}", project.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(project.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.isSite360").value(DEFAULT_IS_SITE_360.booleanValue()))
            .andExpect(jsonPath("$.siteNumber").value(DEFAULT_SITE_NUMBER))
            .andExpect(jsonPath("$.internalDue").value(DEFAULT_INTERNAL_DUE.toString()))
            .andExpect(jsonPath("$.towerType").value(DEFAULT_TOWER_TYPE))
            .andExpect(jsonPath("$.pONumber").value(DEFAULT_P_O_NUMBER))
            .andExpect(jsonPath("$.towerLatitude").value(DEFAULT_TOWER_LATITUDE.doubleValue()))
            .andExpect(jsonPath("$.towerLongitude").value(DEFAULT_TOWER_LONGITUDE.doubleValue()))
            .andExpect(jsonPath("$.memo").value(DEFAULT_MEMO));
    }

    @Test
    @Transactional
    public void getNonExistingProject() throws Exception {
        // Get the project
        restProjectMockMvc.perform(get("/api/projects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProject() throws Exception {
        // Initialize the database
        projectService.save(project);

        int databaseSizeBeforeUpdate = projectRepository.findAll().size();

        // Update the project
        Project updatedProject = projectRepository.findById(project.getId()).get();
        // Disconnect from session so that the updates on updatedProject are not directly saved in db
        em.detach(updatedProject);
        updatedProject
            .name(UPDATED_NAME)
            .isSite360(UPDATED_IS_SITE_360)
            .siteNumber(UPDATED_SITE_NUMBER)
            .internalDue(UPDATED_INTERNAL_DUE)
            .towerType(UPDATED_TOWER_TYPE)
            .pONumber(UPDATED_P_O_NUMBER)
            .towerLatitude(UPDATED_TOWER_LATITUDE)
            .towerLongitude(UPDATED_TOWER_LONGITUDE)
            .memo(UPDATED_MEMO);

        restProjectMockMvc.perform(put("/api/projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProject)))
            .andExpect(status().isOk());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeUpdate);
        Project testProject = projectList.get(projectList.size() - 1);
        assertThat(testProject.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testProject.isIsSite360()).isEqualTo(UPDATED_IS_SITE_360);
        assertThat(testProject.getSiteNumber()).isEqualTo(UPDATED_SITE_NUMBER);
        assertThat(testProject.getInternalDue()).isEqualTo(UPDATED_INTERNAL_DUE);
        assertThat(testProject.getTowerType()).isEqualTo(UPDATED_TOWER_TYPE);
        assertThat(testProject.getpONumber()).isEqualTo(UPDATED_P_O_NUMBER);
        assertThat(testProject.getTowerLatitude()).isEqualTo(UPDATED_TOWER_LATITUDE);
        assertThat(testProject.getTowerLongitude()).isEqualTo(UPDATED_TOWER_LONGITUDE);
        assertThat(testProject.getMemo()).isEqualTo(UPDATED_MEMO);
    }

    @Test
    @Transactional
    public void updateNonExistingProject() throws Exception {
        int databaseSizeBeforeUpdate = projectRepository.findAll().size();

        // Create the Project

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjectMockMvc.perform(put("/api/projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(project)))
            .andExpect(status().isBadRequest());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProject() throws Exception {
        // Initialize the database
        projectService.save(project);

        int databaseSizeBeforeDelete = projectRepository.findAll().size();

        // Delete the project
        restProjectMockMvc.perform(delete("/api/projects/{id}", project.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
