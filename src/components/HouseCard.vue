<script setup>
import { House } from "../models/House.js";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { housesService } from "../services/HousesService.js";
import { logger } from "../utils/Logger.js";
import { computed } from "vue";


defineProps({
house: House
})

const account = computed(() => AppState.account)

async function demolishHouse(houseId){
try {
  
const wantsToDemolish = await Pop.confirm('Are you sure you want to Demolish?', 'There is no undoing this...', 'DEMOLISH', "question")

if(!wantsToDemolish) return

logger.log('💣🏡', houseId)

await housesService.demolishHouse(houseId)

} catch (error) {
  Pop.toast ("Couldn't demolish House")
}


}

</script>


<template>
<div class="card mb-3 selectable">
<img :src="house.imgUrl" alt="" class="img-fluid  p-2">
<div class="card-text text-center">
  <h1>${{ house.price }} </h1>
  <div class="d-flex justify-content-around p-2">
<p>{{ house.bedrooms }} Bedroom(s)/</p>
<p>{{ house.bathrooms }} Bathroom(s)/</p>
<p>{{ house.levels }} Level(s)</p>
</div>
<div class="d-flex justify-content-center p-2">
 <p>Year: {{ house.year }} </p>
</div>
 <p>{{ house.description }}</p>
</div>
<button v-if="house.creatorId == account?.id" @click="demolishHouse(house.id)" class="btn btn-outline-danger" title="Full Send!">Demolish</button>
</div>
</template>


<style lang="scss" scoped>

</style>