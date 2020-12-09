// see where it stop and how long it stop ...
const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root@localhost:3306/boatapp') 
const find_distance = require('./find_distance')

const NodeData = sequelize.define('nodegpsdata2',{
    nodeownername: Sequelize.STRING,
    gps_point: Sequelize.DataTypes.GEOGRAPHY('POINT'),
    updateTime: Sequelize.DATE

},{freezeTableName: true,timestamps: false,

    // I don't want createdAt
    createdAt: false,})
NodeData.removeAttribute('id');

NodeData.findAll().then((result)=>{
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
        var distance = find_distance(result_arr[i].gps_point,result_arr[i+1].gps_point)
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
    stop_range.forEach((val,idx)=>{
        stop_init_pointidx = val[0]
        stop_fin_pointidx = val[1]+1
        if(stop_fin_pointidx+1 >= result_arr.length) stop_fin_pointidx = val[1];
        timestamp_stop = {start:result_arr[stop_init_pointidx].updateTime,end:result_arr[stop_fin_pointidx+1].updateTime,gps_point:result_arr[stop_init_pointidx].gps_point}
        console.log(timestamp_stop)
    })
})