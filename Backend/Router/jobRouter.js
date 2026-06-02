const express=require('express')
const jobController=require('../Controller/jobController')
const usersController=require('../Controller/usersController')
const applicationController=require('../Controller/applicationController')
const router=express.Router()


router.route('/createjobs').post(usersController.protect,usersController.restrict('recruiter'),jobController.createjobs)

router.route('/').get(jobController.getAllJobs)
//here below id is job id
router.route(
  '/:id/apply').post(
  usersController.protect,
  usersController.restrict('job_seeker'),
  applicationController.applyjobs
)

//below is job id
router.route(
  '/:id/applicants').get(
  usersController.protect,
  usersController.restrict('recruiter'),
  applicationController.getApplicantsForJob
)

//here id is applicAtion id
router.route(
  '/applications/:id').patch(
  usersController.protect,
  usersController.restrict('recruiter'),
  applicationController.updateApplicationStatus
)

router.route('/myapplications').get(usersController.protect,usersController.restrict('job_seeker'),applicationController.getStatusofJob)
//here also job id
router.route('/:id').get(jobController.getJobById).
patch(usersController.protect,usersController.restrict('recruiter'),jobController.updateJob)
.delete(usersController.protect,usersController.restrict('recruiter'),jobController.deleteJobs)



module.exports = router