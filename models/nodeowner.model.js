module.exports = (seq,Seq) => {
    const NodeOwner = seq.define('nodeowner',{
        NodeOwnerId : {
            type: Seq.UUID,
            primaryKey: true
        },
        NodeOwnerName : {
            type: Seq.STRING
        },
        NodeOwnerKeyHd5 : {
            type: Seq.STRING
        }
    },{timestamps: false})
    NodeOwner.removeAttribute('id')
    return NodeOwner
}