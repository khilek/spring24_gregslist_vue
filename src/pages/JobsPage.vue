<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { jobsService } from "../services/JobsService.js";
import Pop from "../utils/Pop.js";
import JobCard from "../components/JobCard.vue";



const jobs = computed(()=> AppState.jobs)
const account = computed(() => AppState.account)

async function getJobs(){
try {
  
await jobsService.getJobs()

} catch (error) {
  Pop.toast("Couldn't get Jobs", 'error')
}

}

onMounted(() => {
  getJobs()
})
</script>


<template>
<div class="container-fluid">
  <section class="row">
<div class="col-6 m-3 text-center d-flex align-items-center gap-3">
<h1>Jobs</h1>

<button v-if="account" class="btn btn-outline-dark" title="Create a Job Listing!" data-bs-toggle="modal" data-bs-target="#jobFormModal">
  <i class="mdi mdi-plus"></i>
</button>


</div>
</section>

<section class="row">
<div v-for="job in jobs" :key="job.id" class="col-4">
<JobCard :job="job"/>
</div>

</section>



</div>

<JobFormModal/>

</template>


<style lang="scss" scoped>

</style>