package com.btgrp.protrack.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Project.
 */
@Entity
@Table(name = "project")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Project implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "is_site_360")
    private Boolean isSite360;

    @Column(name = "site_number")
    private Integer siteNumber;

    @Column(name = "internal_due")
    private Instant internalDue;

    @Column(name = "tower_type")
    private String towerType;

    @Column(name = "p_o_number")
    private String pONumber;

    @Column(name = "tower_latitude")
    private Double towerLatitude;

    @Column(name = "tower_longitude")
    private Double towerLongitude;

    @Column(name = "memo")
    private String memo;

    @OneToOne
    @JoinColumn(unique = true)
    private User programManager;

    @OneToOne
    @JoinColumn(unique = true)
    private User projectManager;

    @OneToMany(mappedBy = "parentProject")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Task> tasks = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("projects")
    private Carrier carrier;

    @ManyToOne
    @JsonIgnoreProperties("billedProjects")
    private Company billingCompany;

    @ManyToOne
    @JsonIgnoreProperties("siteProjects")
    private Company siteCompany;

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

    public Project name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isIsSite360() {
        return isSite360;
    }

    public Project isSite360(Boolean isSite360) {
        this.isSite360 = isSite360;
        return this;
    }

    public void setIsSite360(Boolean isSite360) {
        this.isSite360 = isSite360;
    }

    public Integer getSiteNumber() {
        return siteNumber;
    }

    public Project siteNumber(Integer siteNumber) {
        this.siteNumber = siteNumber;
        return this;
    }

    public void setSiteNumber(Integer siteNumber) {
        this.siteNumber = siteNumber;
    }

    public Instant getInternalDue() {
        return internalDue;
    }

    public Project internalDue(Instant internalDue) {
        this.internalDue = internalDue;
        return this;
    }

    public void setInternalDue(Instant internalDue) {
        this.internalDue = internalDue;
    }

    public String getTowerType() {
        return towerType;
    }

    public Project towerType(String towerType) {
        this.towerType = towerType;
        return this;
    }

    public void setTowerType(String towerType) {
        this.towerType = towerType;
    }

    public String getpONumber() {
        return pONumber;
    }

    public Project pONumber(String pONumber) {
        this.pONumber = pONumber;
        return this;
    }

    public void setpONumber(String pONumber) {
        this.pONumber = pONumber;
    }

    public Double getTowerLatitude() {
        return towerLatitude;
    }

    public Project towerLatitude(Double towerLatitude) {
        this.towerLatitude = towerLatitude;
        return this;
    }

    public void setTowerLatitude(Double towerLatitude) {
        this.towerLatitude = towerLatitude;
    }

    public Double getTowerLongitude() {
        return towerLongitude;
    }

    public Project towerLongitude(Double towerLongitude) {
        this.towerLongitude = towerLongitude;
        return this;
    }

    public void setTowerLongitude(Double towerLongitude) {
        this.towerLongitude = towerLongitude;
    }

    public String getMemo() {
        return memo;
    }

    public Project memo(String memo) {
        this.memo = memo;
        return this;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public User getProgramManager() {
        return programManager;
    }

    public Project programManager(User user) {
        this.programManager = user;
        return this;
    }

    public void setProgramManager(User user) {
        this.programManager = user;
    }

    public User getProjectManager() {
        return projectManager;
    }

    public Project projectManager(User user) {
        this.projectManager = user;
        return this;
    }

    public void setProjectManager(User user) {
        this.projectManager = user;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public Project tasks(Set<Task> tasks) {
        this.tasks = tasks;
        return this;
    }

    public Project addTasks(Task task) {
        this.tasks.add(task);
        task.setParentProject(this);
        return this;
    }

    public Project removeTasks(Task task) {
        this.tasks.remove(task);
        task.setParentProject(null);
        return this;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public Carrier getCarrier() {
        return carrier;
    }

    public Project carrier(Carrier carrier) {
        this.carrier = carrier;
        return this;
    }

    public void setCarrier(Carrier carrier) {
        this.carrier = carrier;
    }

    public Company getBillingCompany() {
        return billingCompany;
    }

    public Project billingCompany(Company company) {
        this.billingCompany = company;
        return this;
    }

    public void setBillingCompany(Company company) {
        this.billingCompany = company;
    }

    public Company getSiteCompany() {
        return siteCompany;
    }

    public Project siteCompany(Company company) {
        this.siteCompany = company;
        return this;
    }

    public void setSiteCompany(Company company) {
        this.siteCompany = company;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Project)) {
            return false;
        }
        return id != null && id.equals(((Project) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Project{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", isSite360='" + isIsSite360() + "'" +
            ", siteNumber=" + getSiteNumber() +
            ", internalDue='" + getInternalDue() + "'" +
            ", towerType='" + getTowerType() + "'" +
            ", pONumber='" + getpONumber() + "'" +
            ", towerLatitude=" + getTowerLatitude() +
            ", towerLongitude=" + getTowerLongitude() +
            ", memo='" + getMemo() + "'" +
            "}";
    }
}
