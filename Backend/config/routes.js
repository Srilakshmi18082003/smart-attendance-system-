let express = require('express');
let router = express.Router(); 

import adminRoutes from './Modules/Admin/Routes/AuthRoutes.js';

router.use('/admin', adminRoutes);

export default router;