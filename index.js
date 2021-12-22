let express = require('express');
let app = express();
let morgan = require('morgan');
let bodyParser = require('body-parser');
let user = require('./api/user/index.js');

//package.json파일 안에서 바인딩 할 때 NODE_ENV=test 이 부분이 붙여져있어야한다.
if(process.env.NODE_ENV !=='test'){
    app.use(morgan('dev'));
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users',user);


//test 코드를 돌릴 때 supertest에서도 서버를 돌리기 때문에 중복이 된다.
//그래서 여기에서는 잠시 막아놓는다.
// app.listen(3000,function(){
//     console.log('Example app listening on port 3000!');
// });


module.exports=app;