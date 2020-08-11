import app from './App'
import { environment } from './env/environment';

const port = process.env.PORT || environment.defaultPort

app.listen(port).then(() => {
    console.log(`Services is listening on ${port}`);
}).catch((err) => {
    console.error(err);
});