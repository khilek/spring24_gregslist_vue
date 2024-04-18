import { AppState } from "../AppState.js"
import { Job } from "../models/Job.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class JobsService{



async getJobs(){
const response = await api.get('api/jobs')
logger.log('Getting Jobs', response.data)
response.data.reverse()
AppState.jobs = response.data.map( job => new Job(job))
}



async createJob(jobData){
const response = await api.post('api/jobs', jobData)
logger.log("Creating Job", response.data)
const newJob = new Job(response.data)
AppState.jobs.unshift(newJob)


}

async closeJobOpening(jobId){
  const response = await api.delete(`api/jobs/${jobId}`)
  logger.log('Closing Job', response.data)
const jobs = AppState.jobs
const jobIndex = jobs.findIndex (job => job.id == jobId)
if(jobIndex == -1) throw new Error("Couldn't find Index")
jobs.splice(jobIndex, 1)


}






}

export const jobsService = new JobsService()