module.exports = {
    userId: {
        type: String,
        required: true,
        index: true,
        ref: 'user'
    },
    updatedAt: {
        type: Date
    },
    createdAt: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    },
    status: String,
    turnaroundTime: Number,
    tags: String,
    candidateId: String,
    ssnTraceId: String,
    sexOffenderSearchId: String,
    nationalCriminalSearchId: String,
    federalCriminalSearchId: String,
    countyCriminalSearchIds: [ String ],
    motorVehicleReportId: String,
    stateCriminalSearchIds: [ String ],
    documentIds: [ String ]
};
