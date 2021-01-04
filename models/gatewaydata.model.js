module.exports = (seq,Seq) => {
    const GatewayData = seq.define('gateway',{
        gatewayId : {
            type: Seq.STRING
        },
        gatewayName : {
            type: Seq.STRING
        },
        gatewayLocation : {
            type: Seq.GEOMETRY('POINT') 
        },
        gatewayackUpdate : {
            type: Seq.DATE
        }
    },{timestamps: false,createdAt: false})
    GatewayData.removeAttribute('id')
    return GatewayData

}

