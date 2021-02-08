module.exports = (seq,Seq)=>{
    const NodeGPS = seq.define('nodegpsdata',{
        nodeName: {
            type: Seq.STRING
        },
        nodeGPScoordinate:{
            type: Seq.GEOMETRY('POINT') 
        },
        updateTimestamp:{
            type: Seq.DATE
        }
    },{timestamps: false,createdAt: false})
    NodeGPS.removeAttribute('id')
    return NodeGPS
}