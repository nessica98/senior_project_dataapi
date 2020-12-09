const {point} = require('@turf/helpers')
const distance = require('@turf/distance').default
const find_distance = (first_point,last_point) => {

    const pt1 = point([first_point.coordinates[1],first_point.coordinates[0]])
    const pt2 = point([last_point.coordinates[1],last_point.coordinates[0]])
    console.log('pt1 pt2',pt1,pt2)
    return distance(pt1,pt2,{units:'kilometers'})
}
module.exports = find_distance