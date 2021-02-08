module.exports = (seq,Seq) => {
    const LogbookData = seq.define('logbook', {
        LogbookListId: {
            type: Seq.STRING,
            primaryKey: true
        },
        nodename: {
            type: Seq.STRING
        }
    })
    const LogbookListData = seq.define('logbooklist',{
        FisheryKind : {
            type: Seq.STRING
        },
        FisheryKindAmount: {
            type: Seq.FLOAT
        },
        Unit: {
            type: Seq.STRING
        }
        
    },{timestamps: false,createdAt: false})
    LogbookData.removeAttribute('id')
    //LogbookListData.removeAttribute('id')


    LogbookData.hasMany(LogbookListData, {as:'lists'})
    LogbookListData.belongsTo(LogbookData);
    return {LogbookListData,LogbookData}

}