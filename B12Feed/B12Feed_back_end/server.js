import app from './app.js';
import { PORT } from './config/config.js'
import 'dotenv/config'

app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`))