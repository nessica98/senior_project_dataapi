module.exports = (seq,Seq)=>{
    const NodeGPS = seq.define('nodegpsdata',{
        nodeId: {
            type: Seq.INTEGER
        },
        nodeGPScoordinate:{
            type: Seq.GEOMETRY('POINT') 
        },
        updateTimestamp:{
            type: Seq.DATE
        },
        RSSI:{
            type: Seq.INTEGER
        }
    },{timestamps: false,createdAt: false})
    NodeGPS.removeAttribute('id')
    return NodeGPS
}