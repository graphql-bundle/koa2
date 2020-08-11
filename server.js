const Koa = require('koa');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const schema = require('./graphql/schema');
// server.js
const cors = require('koa2-cors');

const app = new Koa();


// 具体参数我们在后面进行解释
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:3000'; // 这样就能只允许 http://localhost:3080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTION', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))


app.use(mount('/graphql', graphqlHTTP({
 schema: schema,
 graphiql: true
})))

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.on('error', err => {
  console.error('server error', err)
});