package com.btgrp.protrack.service;

import com.btgrp.protrack.domain.Carrier;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Carrier}.
 */
public interface CarrierService {

    /**
     * Save a carrier.
     *
     * @param carrier the entity to save.
     * @return the persisted entity.
     */
    Carrier save(Carrier carrier);

    /**
     * Get all the carriers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Carrier> findAll(Pageable pageable);


    /**
     * Get the "id" carrier.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Carrier> findOne(Long id);

    /**
     * Delete the "id" carrier.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
