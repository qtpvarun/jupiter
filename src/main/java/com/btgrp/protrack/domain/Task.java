package com.btgrp.protrack.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.btgrp.protrack.domain.enumeration.TaskStatus;

import com.btgrp.protrack.domain.enumeration.Priority;

import com.btgrp.protrack.domain.enumeration.Grade;

/**
 * A Task.
 */
@Entity
@Table(name = "task")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "erp_project_id")
    private String erpProjectID;

    @Column(name = "erp_project_sequence")
    private String erpProjectSequence;

    @Column(name = "erp_project_type")
    private String erpProjectType;

    @Column(name = "erp_status")
    private String erpStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private TaskStatus status;

    @Column(name = "assigned_date")
    private String assignedDate;

    @Column(name = "estimated_completion_date")
    private Instant estimatedCompletionDate;

    @Column(name = "completed_date")
    private Instant completedDate;

    @Column(name = "draft_due_date")
    private Instant draftDueDate;

    @Column(name = "internal_due_date")
    private Instant internalDueDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority")
    private Priority priority;

    @Column(name = "is_overdue")
    private Boolean isOverdue;

    @Column(name = "in_progress")
    private Boolean inProgress;

    @Enumerated(EnumType.STRING)
    @Column(name = "grade")
    private Grade grade;

    @OneToMany(mappedBy = "parentTask")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SubTask> subTasks = new HashSet<>();

    @OneToMany(mappedBy = "parentTask")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TaskHistory> taskHistories = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("tasks")
    private User assignedTo;

    @ManyToOne
    @JsonIgnoreProperties("tasks")
    private User assignedBy;

    @ManyToOne
    @JsonIgnoreProperties("tasks")
    private User assignedQC;

    @ManyToOne
    @JsonIgnoreProperties("tasks")
    private Project parentProject;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Task name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Task description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getErpProjectID() {
        return erpProjectID;
    }

    public Task erpProjectID(String erpProjectID) {
        this.erpProjectID = erpProjectID;
        return this;
    }

    public void setErpProjectID(String erpProjectID) {
        this.erpProjectID = erpProjectID;
    }

    public String getErpProjectSequence() {
        return erpProjectSequence;
    }

    public Task erpProjectSequence(String erpProjectSequence) {
        this.erpProjectSequence = erpProjectSequence;
        return this;
    }

    public void setErpProjectSequence(String erpProjectSequence) {
        this.erpProjectSequence = erpProjectSequence;
    }

    public String getErpProjectType() {
        return erpProjectType;
    }

    public Task erpProjectType(String erpProjectType) {
        this.erpProjectType = erpProjectType;
        return this;
    }

    public void setErpProjectType(String erpProjectType) {
        this.erpProjectType = erpProjectType;
    }

    public String getErpStatus() {
        return erpStatus;
    }

    public Task erpStatus(String erpStatus) {
        this.erpStatus = erpStatus;
        return this;
    }

    public void setErpStatus(String erpStatus) {
        this.erpStatus = erpStatus;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public Task status(TaskStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public String getAssignedDate() {
        return assignedDate;
    }

    public Task assignedDate(String assignedDate) {
        this.assignedDate = assignedDate;
        return this;
    }

    public void setAssignedDate(String assignedDate) {
        this.assignedDate = assignedDate;
    }

    public Instant getEstimatedCompletionDate() {
        return estimatedCompletionDate;
    }

    public Task estimatedCompletionDate(Instant estimatedCompletionDate) {
        this.estimatedCompletionDate = estimatedCompletionDate;
        return this;
    }

    public void setEstimatedCompletionDate(Instant estimatedCompletionDate) {
        this.estimatedCompletionDate = estimatedCompletionDate;
    }

    public Instant getCompletedDate() {
        return completedDate;
    }

    public Task completedDate(Instant completedDate) {
        this.completedDate = completedDate;
        return this;
    }

    public void setCompletedDate(Instant completedDate) {
        this.completedDate = completedDate;
    }

    public Instant getDraftDueDate() {
        return draftDueDate;
    }

    public Task draftDueDate(Instant draftDueDate) {
        this.draftDueDate = draftDueDate;
        return this;
    }

    public void setDraftDueDate(Instant draftDueDate) {
        this.draftDueDate = draftDueDate;
    }

    public Instant getInternalDueDate() {
        return internalDueDate;
    }

    public Task internalDueDate(Instant internalDueDate) {
        this.internalDueDate = internalDueDate;
        return this;
    }

    public void setInternalDueDate(Instant internalDueDate) {
        this.internalDueDate = internalDueDate;
    }

    public Priority getPriority() {
        return priority;
    }

    public Task priority(Priority priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Boolean isIsOverdue() {
        return isOverdue;
    }

    public Task isOverdue(Boolean isOverdue) {
        this.isOverdue = isOverdue;
        return this;
    }

    public void setIsOverdue(Boolean isOverdue) {
        this.isOverdue = isOverdue;
    }

    public Boolean isInProgress() {
        return inProgress;
    }

    public Task inProgress(Boolean inProgress) {
        this.inProgress = inProgress;
        return this;
    }

    public void setInProgress(Boolean inProgress) {
        this.inProgress = inProgress;
    }

    public Grade getGrade() {
        return grade;
    }

    public Task grade(Grade grade) {
        this.grade = grade;
        return this;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }

    public Set<SubTask> getSubTasks() {
        return subTasks;
    }

    public Task subTasks(Set<SubTask> subTasks) {
        this.subTasks = subTasks;
        return this;
    }

    public Task addSubTasks(SubTask subTask) {
        this.subTasks.add(subTask);
        subTask.setParentTask(this);
        return this;
    }

    public Task removeSubTasks(SubTask subTask) {
        this.subTasks.remove(subTask);
        subTask.setParentTask(null);
        return this;
    }

    public void setSubTasks(Set<SubTask> subTasks) {
        this.subTasks = subTasks;
    }

    public Set<TaskHistory> getTaskHistories() {
        return taskHistories;
    }

    public Task taskHistories(Set<TaskHistory> taskHistories) {
        this.taskHistories = taskHistories;
        return this;
    }

    public Task addTaskHistory(TaskHistory taskHistory) {
        this.taskHistories.add(taskHistory);
        taskHistory.setParentTask(this);
        return this;
    }

    public Task removeTaskHistory(TaskHistory taskHistory) {
        this.taskHistories.remove(taskHistory);
        taskHistory.setParentTask(null);
        return this;
    }

    public void setTaskHistories(Set<TaskHistory> taskHistories) {
        this.taskHistories = taskHistories;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public Task assignedTo(User user) {
        this.assignedTo = user;
        return this;
    }

    public void setAssignedTo(User user) {
        this.assignedTo = user;
    }

    public User getAssignedBy() {
        return assignedBy;
    }

    public Task assignedBy(User user) {
        this.assignedBy = user;
        return this;
    }

    public void setAssignedBy(User user) {
        this.assignedBy = user;
    }

    public User getAssignedQC() {
        return assignedQC;
    }

    public Task assignedQC(User user) {
        this.assignedQC = user;
        return this;
    }

    public void setAssignedQC(User user) {
        this.assignedQC = user;
    }

    public Project getParentProject() {
        return parentProject;
    }

    public Task parentProject(Project project) {
        this.parentProject = project;
        return this;
    }

    public void setParentProject(Project project) {
        this.parentProject = project;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Task)) {
            return false;
        }
        return id != null && id.equals(((Task) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", erpProjectID='" + getErpProjectID() + "'" +
            ", erpProjectSequence='" + getErpProjectSequence() + "'" +
            ", erpProjectType='" + getErpProjectType() + "'" +
            ", erpStatus='" + getErpStatus() + "'" +
            ", status='" + getStatus() + "'" +
            ", assignedDate='" + getAssignedDate() + "'" +
            ", estimatedCompletionDate='" + getEstimatedCompletionDate() + "'" +
            ", completedDate='" + getCompletedDate() + "'" +
            ", draftDueDate='" + getDraftDueDate() + "'" +
            ", internalDueDate='" + getInternalDueDate() + "'" +
            ", priority='" + getPriority() + "'" +
            ", isOverdue='" + isIsOverdue() + "'" +
            ", inProgress='" + isInProgress() + "'" +
            ", grade='" + getGrade() + "'" +
            "}";
    }
}
