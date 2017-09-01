const { create: saveCandidate } = require('../../../../stores/background-candidate');
const { create: saveReport } = require('../../../../stores/background-report');
const { create: createLog } = require('../../../../stores/unhandled-log');

const {createCandidate, createReport, getReport} = require('../../../../services/checkr');

module.exports = (candidate, state) => (async() => {
    const candidateCreated = await createCandidate(candidate);
    const {error} = await saveCandidate(candidate);

    if (error) return Promise.reject(error);
    const report = await createReport({
        package:'driver_pro',
        candidate_id:candidateCreated.id
    });

    const reportCompleted = await getReport(report.id);

    const reportToSave = Object.assign({
        userId: state.user.id,
    }, reportCompleted);
    const {error: errorSavingReport} = await saveReport(reportToSave);

    if (errorSavingReport) return Promise.reject(errorSavingReport);
})()
    .catch((error) => createLog({
        error,
        body: candidate,
        user:state.user
    }));
