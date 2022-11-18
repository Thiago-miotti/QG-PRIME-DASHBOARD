export function countOccurrences(arr, key) {
    const result = [];

    arr.forEach((x) => {

        // Checking if there is any object in arr2
        // which contains the key value
        if (result.some((val) => val[key] === x[key])) {

            // If yes! then increase the occurrence by 1
            result.forEach((k) => {
                if (k[key] === x[key]) {
                    // eslint-disable-next-line no-plusplus
                    k.occurrence++
                }
            })

        } else {
            // If not! Then create a new object initialize
            // it with the present iteration key's value and
            // set the occurrence to 1
            const a = {}
            a[key] = x[key]
            a.occurrence = 1
            result.push(a);
        }
    })

    return result
}
