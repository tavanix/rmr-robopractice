export function timeDiffCalc(endTime, startTime) {
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

export function renderHeaders(array) {
    const header = array.map((item) => {
        return {
            field: 'Field' + item,
            headerName: item,
            headerClassName: 'header',
            width: item === 'User' ? 150 : item === 'Monthly' ? 125 : 85,
        }
    })
    return header
}

export function renderRows(array, headers) {
    headers = headers.slice(1, headers.length - 1)
    const rows = array.map((user) => {
        let result = {
            id: user.id,
            FieldUser: user.Fullname,
        }

        let monthlyTotal = []

        headers.forEach((headerValue, headerIndex) => {
            let day = user.Days.find((day) => {
                const headerDay = parseInt(headerValue)
                const currentDay = parseInt(day.Date.split('-')[2])
                return headerDay === currentDay
            })

            if (day === undefined) {
                result[`Field${headerIndex + 1}`] = 0
            } else {
                const startTime = day.Date + ' ' + day.Start.replace('-', ':')
                const endTime = day.Date + ' ' + day.End.replace('-', ':')
                const calcTime = timeDiffCalc(endTime, startTime)

                result[`Field${headerIndex + 1}`] = calcTime
                monthlyTotal.push(calcTime)
            }
        })

        monthlyTotal = monthlyTotal.map((item) => {
            let hours = item.split(':')[0]
            let minutes = item.split(':')[1]
            let totalMinutes = +hours * 60 + +minutes
            return totalMinutes
        })

        let sumTime = monthlyTotal.reduce((curr, acc) => {
            return (curr += acc)
        }, 0)

        result.FieldMonthly =
            Math.floor(sumTime / 60) + ':' + Math.floor(sumTime % 60)

        return result
    })
    return rows
}
