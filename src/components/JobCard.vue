<script setup>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { Job } from "../models/Job.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { jobsService } from "../services/JobsService.js";

defineProps({
job: Job
})

const account = computed(() => AppState.account)


async function closeJobOpening(jobId){
try {
  
const wantsToClose = await Pop.confirm('Are you sure you want to Close Job Opening?', 'There is no undoing this...', 'CLOSE', "question")

if(!wantsToClose) return

logger.log('Closing Job', jobId)

await jobsService.closeJobOpening(jobId)

} catch (error) {
  Pop.toast("Couldn't Close Job Opening")
}





}




</script>


<template>
<div class="card mb-3  text-center selectable">
<h1>{{ job.company }}</h1>
<hr/>
<h2>{{ job.jobTitle }}</h2>
<p>{{ job.hours }} Hours</p>
<p>Rate: {{ job.rate }}</p>
<p>{{ job.description }}</p>
<button v-if="job.creatorId == account?.id" @click="closeJobOpening(job.id)" class="btn btn-outline-danger" title="Full Send!">Close Job</button>



</div>
</template>


<style lang="scss" scoped>

</style>