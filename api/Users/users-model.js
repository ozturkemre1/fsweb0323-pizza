const db = require("../../data/db-config")

function getAll() {
    return []
}

function getById(id) {
    return []
}

async function getOrdersByUser() {

/* 
    select *
    from Users
    Join Orders on Users.Id = Orders.UserId
*/

    const rawData = await db("Users as u")
                        .leftJoin("Orders as o","u.Id","o.UserId")
                        .select("u.Name",
                                "u.Surname",
                                "u.Id as UserId",
                                "u.Email",
                                "u.School",
                                "u.Birth_Year",
                                "o.Id as OrderId",
                                "Total_Price")
                        .orderBy("u.id")

    const result = rawData.reduce((acc,item) => {

        const registeredUser = acc.find(user=> user.UserId === item.UserId);
        
       
        
        const newOrder = {
            OrderId: item.OrderId,
            Total_Price: item.Total_Price
    }

        if(!registeredUser){
            //1. yeni user ve order yok => user ve orderı [] olarak ekleyeceğim.
            const newUser = {
                Birth_Year: item.Birth_Year,
                Email: item.Email,
                School: item.School,
                Name:item.Name,
                Surname: item.Surname,
                UserId: item.UserId,
                Orders: []
            }

            if(item.OrderId){ 
                //2. yeni user ve order var => user ve order ekleyeceğiz.
                newUser.Orders.push(newOrder)

            }
            acc.push(newUser)

        }else {
            //3. eski user ama ama yeni orderı var => orderı eski usera ekleyeceğim
            registeredUser.Orders.push(newOrder);
            
        }
        return acc;
    },[])
    return result;
}

module.exports = {
    getAll,
    getById,
    getOrdersByUser
}