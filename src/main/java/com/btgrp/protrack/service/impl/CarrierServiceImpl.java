package com.btgrp.protrack.service.impl;

import com.btgrp.protrack.service.CarrierService;
import com.btgrp.protrack.domain.Carrier;
import com.btgrp.protrack.repository.CarrierRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Carrier}.
 */
@Service
@Transactional
public class CarrierServiceImpl implements CarrierService {

    private final Logger log = LoggerFactory.getLogger(CarrierServiceImpl.class);

    private final CarrierRepository carrierRepository;

    public CarrierServiceImpl(CarrierRepository carrierRepository) {
        this.carrierRepository = carrierRepository;
    }

    /**
     * Save a carrier.
     *
     * @param carrier the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Carrier save(Carrier carrier) {
        log.debug("Request to save Carrier : {}", carrier);
        return carrierRepository.save(carrier);
    }

    /**
     * Get all the carriers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Carrier> findAll(Pageable pageable) {
        log.debug("Request to get all Carriers");
        return carrierRepository.findAll(pageable);
    }


    /**
     * Get one carrier by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Carrier> findOne(Long id) {
        log.debug("Request to get Carrier : {}", id);
        return carrierRepository.findById(id);
    }

    /**
     * Delete the carrier by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Carrier : {}", id);
        carrierRepository.deleteById(id);
    }
}
