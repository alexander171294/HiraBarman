import app from './App'

const port = process.env.PORT || 3000

app.listen(port).then(() => {
    console.log(`Services is listening on ${port}`);
}).catch((err) => {
    console.error(err);
});