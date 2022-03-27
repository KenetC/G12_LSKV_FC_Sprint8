let db = require('../../database/models');
const sequelize = db.sequelize;
const log = console.log;

const usersAPIController = {
    list: async (req, res)=>{
        try{
            let users = await db.Users.findAll({
                include: [
                    {association: 'roles'},
                    {association: 'image_users'},
                    ]
            }); 

            let response = {
                meta: {
                    status: 200,
                    count: users.length
                },
                data: {
                    list:[]
                }
            };

            users.forEach((user,index,arr) => {
                response.data.list.push({
                    id: user.id, 
                    userName: user.userName, 
                    name: user.name, 
                    lastName: user.lastName, 
                    email: user.email, 
                    DNI: user.dni, 
                    date_of_birth: user.date_of_birth, 
                    avatar:  user.image_users[0].url_name,
                    detail: req.headers.host + `/api/users/${user.id}`
                });
            });
            return res.json(response);
        }
        catch(error){
            res.send({err: 'Not found'})
            log("Error UserAPI:",error)
        }
    },
    detail: async(req, res)=>{
        try{
            let user = await db.Users.findByPk(req.params.id,{
                include:['image_users']
            })
            let response = {
                meta:{
                    status:200,
                    url:'api/users/:id'
                },
                data:{
                    id: user.id, 
                    userName: user.userName, 
                    name: user.name, 
                    lastName: user.lastName, 
                    email: user.email, 
                    DNI: user.dni, 
                    date_of_birth: user.date_of_birth, 
                    //Role: user.roles.state,
                    avatar: 'images/users/' + user.image_users[0].url_name
                }
            };
            res.json(response);
        }
        catch(error){
            res.send({err: 'Not fund'})
            log('Error UserDetail', error)
        }
    }
}; 

module.exports = usersAPIController;