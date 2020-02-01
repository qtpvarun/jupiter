package com.btgrp.protrack.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Company.
 */
@Entity
@Table(name = "company")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Company implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "billingCompany")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Project> billedProjects = new HashSet<>();

    @OneToMany(mappedBy = "siteCompany")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Project> siteProjects = new HashSet<>();

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

    public Company name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Company description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Project> getBilledProjects() {
        return billedProjects;
    }

    public Company billedProjects(Set<Project> projects) {
        this.billedProjects = projects;
        return this;
    }

    public Company addBilledProjects(Project project) {
        this.billedProjects.add(project);
        project.setBillingCompany(this);
        return this;
    }

    public Company removeBilledProjects(Project project) {
        this.billedProjects.remove(project);
        project.setBillingCompany(null);
        return this;
    }

    public void setBilledProjects(Set<Project> projects) {
        this.billedProjects = projects;
    }

    public Set<Project> getSiteProjects() {
        return siteProjects;
    }

    public Company siteProjects(Set<Project> projects) {
        this.siteProjects = projects;
        return this;
    }

    public Company addSiteProjects(Project project) {
        this.siteProjects.add(project);
        project.setSiteCompany(this);
        return this;
    }

    public Company removeSiteProjects(Project project) {
        this.siteProjects.remove(project);
        project.setSiteCompany(null);
        return this;
    }

    public void setSiteProjects(Set<Project> projects) {
        this.siteProjects = projects;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Company)) {
            return false;
        }
        return id != null && id.equals(((Company) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Company{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
