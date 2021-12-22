//api 로직

// let users=[
//     {id:1, name:'alice'},
//     {id:2, name:'bek'},
//     {id:3, name:'chrdfdfs'}
// ];

//실제 db를 가져온다.
const models = require('../../models');

const index = function(req,res){
    //index.spec.js 에서 최대 limit 갯수 테스트가 실패한다.
    //테스트에 코드를 맞추기 위해서 query로 넘어온 limit값을 받아서
    //배열을 slice한 뒤에 json으로 보낸다.

    //유저 객체 담은 배열로 응답하는 테스트 코드에서 빈 배열이 들어왔다고 테스트 통과 못한다.
    //따라서 query에 limit이 있으면 그대로 설정해주고 없다면 10을 설정해주자.
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if(Number.isNaN(limit)){
        return res.status(400).end();
    }
    
    models.User
        .findAll({
            limit:limit
        })
        .then(users=>{
            res.json(users);
        })

    //res.json(users.slice(0, limit));
};

const show = function(req,res){
    const id = parseInt(req.params.id,10);
    if(Number.isNaN(id)) return res.status(400).end();
    
    models.User.findOne({
        where:{
            id: id
        }
    })
    .then(user=>{
        if(!user) return res.status(404).end();
        res.json(user);
    });
}

const destroy = function(req,res){
    const id = parseInt(req.params.id,10);
    if(isNaN(id)) return res.status(400).end();
    // users = users.filter(user=>user.id!==id); // user.id가 삭제할 id와 같지 않은 배열을 새로 만들어서 
    //                                           // user에 대입해준다 ==> delete와 같은 효과!

    models.User.destroy({
        where: {id}
    })
    .then(()=>{
        res.status(204).end();
    })
};

const create = (req,res)=>{
    const name = req.body.name;
    if(!name) return res.status(400).end();

    models.User.create({name})
        .then(user=>{
        //console.log(user);
        res.status(201).json(user);
    })
    .catch(err=>{
        //console.log(err);
        if(err.name === "SequelizeUniqueConstraintError") {
            return res.status(409).end();
        }
        res.status(500).end();
    })

    // const isConflic = users.filter(user=>user.name===name).length
    // if(isConflic) return res.status(409).end();

    // const id = Date.now();
    // const user = {id,name};
    // users.push(user);
    
};

const update =  (req,res)=>{
    const id = parseInt(req.params.id);
    if(isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    if(!name) return res.status(400).end();

    models.User.findOne({where:{id}})
        .then(user=>{
            if(!user) return res.status(404).end();

            user.name = name;
            user.save()
                .then(user=>{
                    res.json(user);
                })
                .catch(err=>{
                    if(err.name === "SequelizeUniqueConstraintError") {
                        return res.status(409).end();
                    }
                    res.status(500).end();
                });
        })

    // const isConflict = users.filter(user=>user.name === name).length
    // if(isConflict) return res.status(409).end();
    // user.name = name;

    // const user = users.filter(user=>user.id===id)[0];
    // if(!user) return res.status(404).end();
}

module.exports={
    index,show,destroy,create,update
};