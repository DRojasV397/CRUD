const app = require('./app');
const { PORT } = require('./config');
const connectDB = require('./db')


async function main(){
    try{ await connectDB();
    const port = PORT;
    app.listen(port, () => {
        console.log(`Servidor en ejecución en http://localhost:${port}`);
    });} catch(error){
        console.log(error)
    }
}

main()
