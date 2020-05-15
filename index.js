 const express = require('express');
 const app = express()


 require('./startups/use')(app);
 require('./startups/configs')();
 require('./startups/db')();

 const port = process.env.PORT || 4200
 app.listen(port, () => console.log(`listening on port ${port}`))