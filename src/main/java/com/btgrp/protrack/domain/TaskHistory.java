package com.btgrp.protrack.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

import com.btgrp.protrack.domain.enumeration.EventType;

/**
 * A TaskHistory.
 */
@Entity
@Table(name = "task_history")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TaskHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_date")
    private Instant eventDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "event_type")
    private EventType eventType;

    @Column(name = "event_topic")
    private String eventTopic;

    @Column(name = "event_detail")
    private String eventDetail;

    @Column(name = "redline")
    private String redline;

    @ManyToOne
    @JsonIgnoreProperties("taskHistories")
    private Task parentTask;

    @ManyToOne
    @JsonIgnoreProperties("taskHistories")
    private SubTask parentSubTask;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getEventDate() {
        return eventDate;
    }

    public TaskHistory eventDate(Instant eventDate) {
        this.eventDate = eventDate;
        return this;
    }

    public void setEventDate(Instant eventDate) {
        this.eventDate = eventDate;
    }

    public EventType getEventType() {
        return eventType;
    }

    public TaskHistory eventType(EventType eventType) {
        this.eventType = eventType;
        return this;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public String getEventTopic() {
        return eventTopic;
    }

    public TaskHistory eventTopic(String eventTopic) {
        this.eventTopic = eventTopic;
        return this;
    }

    public void setEventTopic(String eventTopic) {
        this.eventTopic = eventTopic;
    }

    public String getEventDetail() {
        return eventDetail;
    }

    public TaskHistory eventDetail(String eventDetail) {
        this.eventDetail = eventDetail;
        return this;
    }

    public void setEventDetail(String eventDetail) {
        this.eventDetail = eventDetail;
    }

    public String getRedline() {
        return redline;
    }

    public TaskHistory redline(String redline) {
        this.redline = redline;
        return this;
    }

    public void setRedline(String redline) {
        this.redline = redline;
    }

    public Task getParentTask() {
        return parentTask;
    }

    public TaskHistory parentTask(Task task) {
        this.parentTask = task;
        return this;
    }

    public void setParentTask(Task task) {
        this.parentTask = task;
    }

    public SubTask getParentSubTask() {
        return parentSubTask;
    }

    public TaskHistory parentSubTask(SubTask subTask) {
        this.parentSubTask = subTask;
        return this;
    }

    public void setParentSubTask(SubTask subTask) {
        this.parentSubTask = subTask;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TaskHistory)) {
            return false;
        }
        return id != null && id.equals(((TaskHistory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TaskHistory{" +
            "id=" + getId() +
            ", eventDate='" + getEventDate() + "'" +
            ", eventType='" + getEventType() + "'" +
            ", eventTopic='" + getEventTopic() + "'" +
            ", eventDetail='" + getEventDetail() + "'" +
            ", redline='" + getRedline() + "'" +
            "}";
    }
}
