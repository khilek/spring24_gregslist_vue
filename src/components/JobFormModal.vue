<script setup>
import { ref } from "vue";
import { logger } from "../utils/Logger.js";
import { jobsService } from "../services/JobsService.js";
import { Modal } from "bootstrap";
import Pop from "../utils/Pop.js";




const jobFormData = ref({
  company: '',
  jobTitle: '',
  hours: '',
  rate: '',
  description: '',


  
})


async function createJob(){
  try {
    logger.log("Creating Job", jobFormData)

await jobsService.createJob(jobFormData.value)

jobFormData.value = {
  company: '',
  jobTitle: '',
  hours: '',
  rate: '',
  description: '',
}

Modal.getOrCreateInstance('#jobFormModal').hide()

  } catch (error) {
    Pop.toast("Couldn't create Job", 'error')
  }
}



</script>


<template>


<!-- Modal -->
<div class="modal fade" id="jobFormModal" tabindex="-1" aria-labelledby="jobFormModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="jobFormModalLabel">Create a new Job listing!</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <form @submit.prevent="createJob()">

          <div class="form-floating mb-3">
            <input v-model="jobFormData.company" type="text" class="form-control" id="jobCompany" placeholder="Company"
              required>
            <label for="jobCompany">Company</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="jobFormData.jobTitle" type="text" class="form-control" id="jobTitle"
              placeholder="Job Title" required>
            <label for="jobTitle">Job Title</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="jobFormData.hours" type="text" class="form-control" id="jobHours"
              placeholder="Hours" required>
            <label for="jobHours">Hours</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="jobFormData.rate" type="text" class="form-control" id="jobRate" placeholder="Rate"
              required>
            <label for="jobRate">Rate</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="jobFormData.description" type="text" class="form-control" id="jobDescription" placeholder="Description"
              required>
            <label for="jobDescription">Description</label>
          </div>

          <div class="text-end">
            <button class="btn btn-success" type="submit">Submit</button>
          </div>
        </form>

      </div>
      <!-- <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div> -->
    </div>
  </div>
</div>





</template>


<style lang="scss" scoped>

</style>