const Anniversary = require('../models/Anniversary')
const Couple = require('../models/Couple')
const asyncHandler = require('express-async-handler')

const createAnniversary = asyncHandler(async (req, res) => {
    const { coupleId } = req.params

    let { title, description, start, end, allDay, color } = req.body
    if (!title || !start || !end) return res.status(404).json({ success: false, result: 'Missing inputs' })

    const anni = await Anniversary.create({ title, description, start, end, allDay, coupleId, color })
    return res.status(200).json({
        success: anni ? true : false,
        result: anni ? anni : 'Can not create new anniversary'
    })
})

const getAnniversariesByCouple = asyncHandler(async (req, res) => {
    const { coupleId } = req.params
    if (!coupleId) return res.status(404).json({ success: false, result: 'Can not find couple' })

    const anniversaries = await Anniversary.find({ coupleId: coupleId })
    return res.status(200).json({
        success: anniversaries ? true : false,
        result: anniversaries ? anniversaries : 'No anniversary found'
    })
})

const currentMonth = asyncHandler(async (req, res) => {
    const { coupleId } = req.params;
    const { mm } = req.body;
    const m = parseInt(mm);
    const currentM = await Anniversary.find({
        $and: [
            { coupleId: coupleId },
            {
                $expr: {
                    $eq: [
                        {
                            $month: "$start",
                        },
                        m,
                    ],
                },
            },
        ]
    }).sort({ start: 1 });
    return res.status(200).json({
        success: currentM ? true : false,
        result: currentM ? currentM : 'Can not get any anniversary in this month'
    });
});


const updateEvent = asyncHandler(async (req, res) => {
    const { updateAnniId } = req.params
    const { start, end } = req.body
    const updateEvent = await Anniversary.findByIdAndUpdate(updateAnniId, { start, end })
    return res.status(200).json({
        success: updateEvent ? true : false,
        result: updateEvent ? updateEvent : 'Can not update this anni'
    })
})

const deleteEvent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { idAnni } = req.params

    const couple = await Couple.findOne({ $or: [{ createdUser: _id }, { loverUserId: _id }] })
    const removeEvent = await Anniversary.findById(idAnni)
    if (removeEvent.coupleId.toString() !== couple._id.toString()) return res.status(400).json({ success: false, result: 'You dont have permission to remove this anniversary' })
    await removeEvent.deleteOne()
    return res.status(200).json({ success: true, result: removeEvent })
})

module.exports = {
    createAnniversary,
    getAnniversariesByCouple,
    currentMonth,
    updateEvent,
    deleteEvent
}