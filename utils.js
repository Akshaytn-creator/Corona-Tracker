export function getStateFromCode(data, code) {
    if (data.length > 0) {
        for (let i=0; i<data.length; i++) {
            for (const key in data[i]) {
                if (code === data[i][key]['statecode']) {
                    return key
                }
            }
        }
    }

    return undefined
} 

export function getDistrictStats(data, state, district) {
    if(data.length > 0) {
        for (let i=0; i<data.length; i++) {
            for (const stateKey in data[i]) {
                if (stateKey === state) {
                    for (const districtKey in data[i][stateKey].districtData) {
                        if (districtKey === district) {
                            return data[i][stateKey]['districtData'][district]
                        }
                    }
                }
            }
        }
    }

    return undefined
}

export function getChartJSData(data) {
    const obj = {}

    if(data) {
        obj['active'] = data.active
        obj['confirmed'] = data.confirmed + data.delta.confirmed
        obj['deceased'] = data.deceased + data.delta.deceased
        obj['recovered'] = data.recovered + data.delta.recovered

        return obj

    }
}

export function consolidateStateWiseData(data) {
    const arr = []
    let cursor = 0

    if (data.length > 0) {
        for (let i=0; i<data.length-1; i++) {
            for (const state in data[i]) {
                if (state !== 'Telangana' && state !== 'Lakshadweep') {
                    arr[cursor] = []
                    arr[cursor].push(`IN-${data[i][state].statecode}`)
                    arr[cursor].push(state)
                    arr[cursor][2] = 0
                    arr[cursor][3] = 0

                    for (const district in data[i][state].districtData) {
                        arr[cursor][2] += data[i][state]['districtData'][district].confirmed
                        arr[cursor][3] += data[i][state]['districtData'][district].active
                    }

                    cursor++
                }
            }
        }
    }
    return arr
}

export function getStatesDropDownList (data) {
    let arr = []
    if (data.length > 0) {
        for (let i=0; i<data.length; i++) {
            for (const state in data[i]) {
                arr.push([state, data[i][state].statecode])
            }
        }
    }
    return arr;
}