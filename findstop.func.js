const {point} = require('@turf/helpers')
const distance = require('@turf/distance').default
const find_distance = (first_point,last_point) => {

    const pt1 = point([first_point.coordinates[1],first_point.coordinates[0]])
    const pt2 = point([last_point.coordinates[1],last_point.coordinates[0]])
    console.log('pt1 pt2',pt1,pt2)
    return distance(pt1,pt2,{units:'kilometers'})
}

const stop_range_Arr = (result)=>{
    var result_arr = []
    result.forEach(element => {
        console.log(element.dataValues)
        val = element.dataValues
        result_arr.push(val)
    });
    console.log(result_arr)
    
    //var ii = 1
    // From array data to find stop point
    var distance_arr = []
    for(var i = 0;i<result_arr.length-1;i++){
        var distance = find_distance(result_arr[i].nodeGPScoordinate,result_arr[i+1].nodeGPScoordinate)
        distance_arr.push(distance)
        console.log(distance_arr)
    }
   // distance_arr = [0,0,2,0]
    distance_arr.push(1)
    var stop_range = []
    var isStopped = false
    var stop_init,stop_fin = 0
    for(var i = 0;i<distance_arr.length;i++){
        if(distance_arr[i]<0.001){
            if(!isStopped) {
                stop_init = i
            }
            stop_fin = i
            isStopped = true
        }else{
            if(isStopped) {
                stop_range.push([stop_init,stop_fin])
            }
            isStopped = false
            
        }
        console.log(stop_range)
    }
    timestamp_stop_result = []
    stop_range.forEach((val,idx)=>{
        stop_init_pointidx = val[0]
        stop_fin_pointidx = val[1]+1
        if(stop_fin_pointidx+1 >= result_arr.length) stop_fin_pointidx = val[1];
        timestamp_stop = {start:result_arr[stop_init_pointidx].updateTimestamp,end:result_arr[stop_fin_pointidx+1].updateTimestamp,gps_point:result_arr[stop_init_pointidx].nodeGPScoordinate}
        console.log(timestamp_stop)
        timestamp_stop_result.push(timestamp_stop)
    })
    return timestamp_stop_result
}
module.exports = stop_range_Arr