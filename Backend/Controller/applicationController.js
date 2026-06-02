const Application = require('../Models/applicationModel')
const Jobs = require('../Models/JobModel')

const AppError = require('../Utils/appError')
const asynchandler = require('../Utils/asyncHandler')

exports.applyjobs = asynchandler(async (req, res, next) => {

    const jobId = req.params.id

    const existing = await Application.findOne({
        job: jobId,
        applicant: req.user._id
    })

    if (existing) {

        return next(
            new AppError(
                'You have already applied to this job',
                400
            )
        )

    }

    const application = await Application.create({
        job: jobId,
        applicant: req.user._id
    })

    res.status(201).json({
        status: 'success',
        data: application
    })

})


exports.getApplicantsForJob = asynchandler(async (req, res, next) => {

    const jobId = req.params.id

    const job = await Jobs.findById(jobId)

    if (!job) {

        return next(
            new AppError('Job not found', 404)
        )

    }

    if (job.createdBy.toString() !== req.user._id.toString()) {

        return next(
            new AppError(
                'You are not allowed to view applicants',
                403
            )
        )

    }

    const applications = await Application.find({
        job: jobId
    }).populate('applicant', 'name email')

    res.status(200).json({
        status: 'success',
        results: applications.length,
        data: applications
    })

})


exports.updateApplicationStatus = asynchandler(async (req, res, next) => {

    const { status } = req.body

    const application = await Application.findById(req.params.id)

    if (!application) {

        return next(
            new AppError('Application not found', 404)
        )

    }

    const job = await Jobs.findById(application.job)

    if (job.createdBy.toString() !== req.user._id.toString()) {

        return next(
            new AppError(
                'You are not allowed to update this application',
                403
            )
        )

    }

    application.status = status

    await application.save()

    res.status(200).json({
        status: 'success',
        data: application
    })

})

exports.getStatusofJob =
async(req,res)=>{

  const applications =
  await Application.find({

    applicant:req.user.id

  }).populate('job')

  res.status(200).json({

    status:'success',

    results:applications.length,

    data:applications

  })

}