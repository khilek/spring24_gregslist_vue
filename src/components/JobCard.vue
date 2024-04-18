<script setup>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { Job } from "../models/Job.js";

defineProps({
job: Job
})

const account = computed(() => AppState.account)

</script>


<template>
<div class="card mb-3  text-center selectable">
<h1>{{ job.company }}</h1>
<hr/>
<h2>{{ job.jobTitle }}</h2>
<p>{{ job.hours }} Hours</p>
<p>Rate: {{ job.rate }}</p>
<p>{{ job.description }}</p>




</div>
</template>


<style lang="scss" scoped>

</style>