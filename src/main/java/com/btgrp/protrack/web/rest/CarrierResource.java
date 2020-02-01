package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.domain.Carrier;
import com.btgrp.protrack.service.CarrierService;
import com.btgrp.protrack.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.btgrp.protrack.domain.Carrier}.
 */
@RestController
@RequestMapping("/api")
public class CarrierResource {

    private final Logger log = LoggerFactory.getLogger(CarrierResource.class);

    private static final String ENTITY_NAME = "carrier";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CarrierService carrierService;

    public CarrierResource(CarrierService carrierService) {
        this.carrierService = carrierService;
    }

    /**
     * {@code POST  /carriers} : Create a new carrier.
     *
     * @param carrier the carrier to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new carrier, or with status {@code 400 (Bad Request)} if the carrier has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/carriers")
    public ResponseEntity<Carrier> createCarrier(@Valid @RequestBody Carrier carrier) throws URISyntaxException {
        log.debug("REST request to save Carrier : {}", carrier);
        if (carrier.getId() != null) {
            throw new BadRequestAlertException("A new carrier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Carrier result = carrierService.save(carrier);
        return ResponseEntity.created(new URI("/api/carriers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /carriers} : Updates an existing carrier.
     *
     * @param carrier the carrier to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated carrier,
     * or with status {@code 400 (Bad Request)} if the carrier is not valid,
     * or with status {@code 500 (Internal Server Error)} if the carrier couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/carriers")
    public ResponseEntity<Carrier> updateCarrier(@Valid @RequestBody Carrier carrier) throws URISyntaxException {
        log.debug("REST request to update Carrier : {}", carrier);
        if (carrier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Carrier result = carrierService.save(carrier);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, carrier.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /carriers} : get all the carriers.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of carriers in body.
     */
    @GetMapping("/carriers")
    public ResponseEntity<List<Carrier>> getAllCarriers(Pageable pageable) {
        log.debug("REST request to get a page of Carriers");
        Page<Carrier> page = carrierService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /carriers/:id} : get the "id" carrier.
     *
     * @param id the id of the carrier to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the carrier, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/carriers/{id}")
    public ResponseEntity<Carrier> getCarrier(@PathVariable Long id) {
        log.debug("REST request to get Carrier : {}", id);
        Optional<Carrier> carrier = carrierService.findOne(id);
        return ResponseUtil.wrapOrNotFound(carrier);
    }

    /**
     * {@code DELETE  /carriers/:id} : delete the "id" carrier.
     *
     * @param id the id of the carrier to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/carriers/{id}")
    public ResponseEntity<Void> deleteCarrier(@PathVariable Long id) {
        log.debug("REST request to delete Carrier : {}", id);
        carrierService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
