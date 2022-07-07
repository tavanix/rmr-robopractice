export default function timeDiffCalc(endTime, startTime) {
    let diffInMilliSeconds =
        Math.abs(new Date(endTime) - new Date(startTime)) / 1000

    // calc hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24
    diffInMilliSeconds -= hours * 3600

    // calc mins
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60
    diffInMilliSeconds -= minutes * 60

    return `${hours}:${minutes}`
}
