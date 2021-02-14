module.exports = (seq,Seq)=>{
    const NodeData = seq.define('nodedata',{
        nodename: {
            type: Seq.STRING
        },
        nodestartwork:{
            type: Seq.DATEONLY
        },
        nodeackupdate:{
            type: Seq.DATE
        },
        nodeupdate:{
            type: Seq.DATE
        }
    },{timestamps: false,createdAt: false})
    NodeData.removeAttribute('id')
    return NodeData
}