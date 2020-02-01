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

import com.btgrp.protrack.domain.enumeration.SubTaskStatus;

import com.btgrp.protrack.domain.enumeration.Priority;

/**
 * A SubTask.
 */
@Entity
@Table(name = "sub_task")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SubTask implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private SubTaskStatus status;

    @Column(name = "assigned_date")
    private Instant assignedDate;

    @Column(name = "estimated_completion_date")
    private Instant estimatedCompletionDate;

    @Column(name = "closed_date")
    private Instant closedDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority")
    private Priority priority;

    @Column(name = "is_overdue")
    private Boolean isOverdue;

    @Column(name = "in_progress")
    private Boolean inProgress;

    @OneToMany(mappedBy = "parentSubTask")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TaskHistory> taskHistories = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("subTasks")
    private User assignedTo;

    @ManyToOne
    @JsonIgnoreProperties("subTasks")
    private User assignedBy;

    @ManyToOne
    @JsonIgnoreProperties("subTasks")
    private User sourceUser;

    @ManyToOne
    @JsonIgnoreProperties("subTasks")
    private User targetUser;

    @ManyToOne
    @JsonIgnoreProperties("subTasks")
    private Task parentTask;

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

    public SubTask name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public SubTask description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SubTaskStatus getStatus() {
        return status;
    }

    public SubTask status(SubTaskStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(SubTaskStatus status) {
        this.status = status;
    }

    public Instant getAssignedDate() {
        return assignedDate;
    }

    public SubTask assignedDate(Instant assignedDate) {
        this.assignedDate = assignedDate;
        return this;
    }

    public void setAssignedDate(Instant assignedDate) {
        this.assignedDate = assignedDate;
    }

    public Instant getEstimatedCompletionDate() {
        return estimatedCompletionDate;
    }

    public SubTask estimatedCompletionDate(Instant estimatedCompletionDate) {
        this.estimatedCompletionDate = estimatedCompletionDate;
        return this;
    }

    public void setEstimatedCompletionDate(Instant estimatedCompletionDate) {
        this.estimatedCompletionDate = estimatedCompletionDate;
    }

    public Instant getClosedDate() {
        return closedDate;
    }

    public SubTask closedDate(Instant closedDate) {
        this.closedDate = closedDate;
        return this;
    }

    public void setClosedDate(Instant closedDate) {
        this.closedDate = closedDate;
    }

    public Priority getPriority() {
        return priority;
    }

    public SubTask priority(Priority priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Boolean isIsOverdue() {
        return isOverdue;
    }

    public SubTask isOverdue(Boolean isOverdue) {
        this.isOverdue = isOverdue;
        return this;
    }

    public void setIsOverdue(Boolean isOverdue) {
        this.isOverdue = isOverdue;
    }

    public Boolean isInProgress() {
        return inProgress;
    }

    public SubTask inProgress(Boolean inProgress) {
        this.inProgress = inProgress;
        return this;
    }

    public void setInProgress(Boolean inProgress) {
        this.inProgress = inProgress;
    }

    public Set<TaskHistory> getTaskHistories() {
        return taskHistories;
    }

    public SubTask taskHistories(Set<TaskHistory> taskHistories) {
        this.taskHistories = taskHistories;
        return this;
    }

    public SubTask addTaskHistory(TaskHistory taskHistory) {
        this.taskHistories.add(taskHistory);
        taskHistory.setParentSubTask(this);
        return this;
    }

    public SubTask removeTaskHistory(TaskHistory taskHistory) {
        this.taskHistories.remove(taskHistory);
        taskHistory.setParentSubTask(null);
        return this;
    }

    public void setTaskHistories(Set<TaskHistory> taskHistories) {
        this.taskHistories = taskHistories;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public SubTask assignedTo(User user) {
        this.assignedTo = user;
        return this;
    }

    public void setAssignedTo(User user) {
        this.assignedTo = user;
    }

    public User getAssignedBy() {
        return assignedBy;
    }

    public SubTask assignedBy(User user) {
        this.assignedBy = user;
        return this;
    }

    public void setAssignedBy(User user) {
        this.assignedBy = user;
    }

    public User getSourceUser() {
        return sourceUser;
    }

    public SubTask sourceUser(User user) {
        this.sourceUser = user;
        return this;
    }

    public void setSourceUser(User user) {
        this.sourceUser = user;
    }

    public User getTargetUser() {
        return targetUser;
    }

    public SubTask targetUser(User user) {
        this.targetUser = user;
        return this;
    }

    public void setTargetUser(User user) {
        this.targetUser = user;
    }

    public Task getParentTask() {
        return parentTask;
    }

    public SubTask parentTask(Task task) {
        this.parentTask = task;
        return this;
    }

    public void setParentTask(Task task) {
        this.parentTask = task;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubTask)) {
            return false;
        }
        return id != null && id.equals(((SubTask) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SubTask{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", status='" + getStatus() + "'" +
            ", assignedDate='" + getAssignedDate() + "'" +
            ", estimatedCompletionDate='" + getEstimatedCompletionDate() + "'" +
            ", closedDate='" + getClosedDate() + "'" +
            ", priority='" + getPriority() + "'" +
            ", isOverdue='" + isIsOverdue() + "'" +
            ", inProgress='" + isInProgress() + "'" +
            "}";
    }
}
