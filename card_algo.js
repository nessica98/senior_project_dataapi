const member = [23,11,2,10,2]
const customer = [[0,1,2],[1,2,4],[2,3,1],[2,1,4],[2,4,1],[2,4,3],[2,4,3]]

const card_select = (customer_rank,member)=>{
    var member_choosen = -1;
    customer_rank.every(element => {
        //console.log('line 6 >> ', element)
        if(member[element]>0) {
            console.log('Get Artist ', element)
            member_choosen = element
            member[element] = member[element]-1
            console.log(member)
            return false
        }
        return true
    });
    
    if(member_choosen<0){
        member_choosen = member.indexOf(Math.max(...member))
        member[member_choosen] = member[member_choosen]-1
        console.log(member)
    }
    return member_choosen
}

customer.forEach((customer_rank)=>{
    console.log(customer_rank)
    console.log('from out' ,card_select(customer_rank,member))
})