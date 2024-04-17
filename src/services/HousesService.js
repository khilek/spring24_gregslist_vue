import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class HousesService {




async getHouses(){
const response = await api.get('api/houses')
logger.log('Getting 🏡', response.data)
response.data.reverse()
AppState.houses = response.data.map(house => new House(house))
}

async createHouse(houseData){
  const response = await api.post('api/houses', houseData)
  logger.log('Creating 🏡', houseData)
  const newHouse = new House(response.data)
  AppState.houses.unshift(newHouse)
}


async demolishHouse(houseId){
const response = await api.delete(`api/houses/${houseId}`)
logger.log('💣🏡', response.data)
const houses = AppState.houses
const houseIndex = houses.findIndex(house => house.id == houseId)
if(houseIndex == -1) throw new Error ("Couldn't find Index")
houses.splice(houseIndex, 1)

}



}

export const housesService = new HousesService()