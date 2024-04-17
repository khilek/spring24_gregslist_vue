<script setup>
import { ref } from "vue";
import { logger } from "../utils/Logger.js";
import { housesService } from "../services/HousesService.js";
import Pop from "../utils/Pop.js";
import { Modal } from "bootstrap";


const houseFormData = ref({
  bedrooms: '',
  bathrooms: '',
  levels: '',
  year: '',
  price: '',
  description: '',
  imgUrl: ''

  
})

async function createHouse(){
try {
  logger.log ('Creating 🏡', houseFormData)

  await housesService.createHouse(houseFormData.value)

  houseFormData.value = {
  bedrooms: '',
  bathrooms: '',
  levels: '',
  year: '',
  price: '',
  description: '',
  imgUrl: ''
  }

  Modal.getOrCreateInstance('#houseFormModal').hide()

} catch (error) {
  Pop.toast ("Couldn't create Houses", 'error')

}

}



</script>


<template>


<!-- Modal -->
<div class="modal fade" id="houseFormModal" tabindex="-1" aria-labelledby="houseFormModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="houseFormModalLabel">Create a new House listing!</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <form @submit.prevent="createHouse()">

          <div class="form-floating mb-3">
            <input v-model="houseFormData.price" type="text" class="form-control" id="housePrice" placeholder="Price"
              required>
            <label for="housePrice">Price</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="houseFormData.bedrooms" type="text" class="form-control" id="houseBedrooms"
              placeholder="Bedrooms" required>
            <label for="houseBedrooms">Bedrooms</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="houseFormData.bathrooms" type="text" class="form-control" id="houseBathrooms"
              placeholder="Bathrooms" required>
            <label for="houseBathrooms">Bathrooms</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="houseFormData.levels" type="text" class="form-control" id="houseLevels" placeholder="Levels"
              required>
            <label for="houseLevels">Levels</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="houseFormData.year" type="text" class="form-control" id="houseYear" placeholder="Year"
              required>
            <label for="houseYear">Year</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="houseFormData.description" type="text" class="form-control" id="houseDescription"
              placeholder="Description" required>
            <label for="houseDescription">Description</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="houseFormData.imgUrl" type="text" class="form-control" id="houseImgUrl"
              placeholder="House Image URL" required maxLength="500">
            <label for="houseImgUrl">House Image URL</label>
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