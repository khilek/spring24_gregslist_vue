<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { housesService } from "../services/HousesService.js";
import Pop from "../utils/Pop.js";



const houses = computed(()=> AppState.houses)
const account = computed(() => AppState.account)

async function getHouses(){
try {
  await housesService.getHouses()
} catch (error) {
  Pop.toast("Couldn't get Houses", 'error')
  
}

}



onMounted(() => {
  getHouses()
})

</script>



<template>

<div class="container-fluid">
<section class="row">
<div class="col-6 m-3 text-center d-flex align-items-center gap-3">
<h1>Houses</h1>

<button v-if="account" class="btn btn-outline-dark" title="Create a House Listing!" data-bs-toggle="modal" data-bs-target="#houseFormModal">
  <i class="mdi mdi-plus"></i>
</button>


</div>
</section>




<section class="row ">
<div v-for="house in houses" :key="house.id" class="col-4">
  <HouseCard :house="house"/>
</div>


</section>


</div>




<HouseFormModal/>
  
</template>


<style scoped></style>