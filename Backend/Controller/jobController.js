const Jobs = require('../Models/JobModel')
const AppError = require('../Utils/appError')
const asynchandler = require('../Utils/asyncHandler')


exports.getAllJobs = asynchandler(async (req, res, next) => {

    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 5
    const skip = (page - 1) * limit

    const queryObj = { ...req.query }

    const exclude = ['limit', 'page', 'sort']

    exclude.forEach(e => delete queryObj[e])

    for (let key in queryObj) {

        queryObj[key] = {
            $regex: queryObj[key],
            $options: 'i'
        }

    }

    const query = Jobs.find(queryObj)

    query.sort(req.query.sort || '-createdAt')

    query.skip(skip).limit(limit)

    const jobs = await query

    const total = await Jobs.countDocuments(queryObj)

    res.status(200).json({
        status: 'success',
        results: jobs.length,
        total,
        page,
        pages: Math.ceil(total / limit),
        data: jobs
    })

})


exports.createjobs = asynchandler(async (req, res, next) => {

    req.body.createdBy = req.user._id

    const job = await Jobs.create(req.body)

    res.status(201).json({
        status: 'success',
        data: job
    })

})


exports.getJobById = asynchandler(async (req, res, next) => {

    const job = await Jobs.findById(req.params.id)
        .populate('createdBy', 'email name')

    if (!job) {

        return next(
            new AppError('No job found with this ID', 404)
        )

    }

    res.status(200).json({
        status: 'success',
        data: job
    })

})


exports.updateJob = asynchandler(async (req, res, next) => {

    const job = await Jobs.findById(req.params.id)

    if (!job) {

        return next(
            new AppError('No job found with this ID', 404)
        )

    }

    if (job.createdBy.toString() !== req.user._id.toString()) {

        return next(
            new AppError(
                'You are not allowed to update this job',
                403
            )
        )

    }

    const updatejob = await Jobs.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    )

    res.status(200).json({
        status: 'success',
        data: updatejob
    })

})

exports.deleteJobs = asynchandler(async (req, res, next) => {

    const job = await Jobs.findById(req.params.id)

    if (!job) {

        return next(
            new AppError('No job found with this ID', 404)
        )

    }

    if (job.createdBy.toString() !== req.user._id.toString()) {

        return next(
            new AppError(
                'You are not allowed to delete this job',
                403
            )
        )

    }

    await Jobs.findByIdAndDelete(req.params.id)

    res.status(204).json({
        status: 'success',
        data: null
    })

})