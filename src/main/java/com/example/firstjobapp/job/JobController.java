package com.example.firstjobapp.job;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobController {
    private JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public  ResponseEntity<List<Job>> findAll(){
        return ResponseEntity.ok(jobService.findll());
    }

    @PostMapping
    public ResponseEntity<String> addJob(@RequestBody Job job){
        jobService.createJob(job);
        return new ResponseEntity<>("Job added successfully", HttpStatus.OK) ;
    }

    @GetMapping("/{id}")
     public ResponseEntity<Job> findJobById(@PathVariable Long id) {
        Job job = jobService.getJobById(id);
        if (job != null)
            return new ResponseEntity<>(job, HttpStatus.OK);
        return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

@DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable Long id ){
        boolean delete = jobService.deleteJobById(id);
        if (delete)
            return new ResponseEntity<>("Job deleted successfully", HttpStatus.OK);
        return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
//    @RequestMapping(value = "/jobs/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> updateJob(@PathVariable Long id, @RequestBody Job updatedJob){
        boolean updated = jobService.updateJob(id, updatedJob);
        if (updated)
            return new ResponseEntity<>("Job updated successfully", HttpStatus.OK);
        return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
     }
}
