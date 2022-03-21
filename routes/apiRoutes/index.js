const express = require('express');
const router = express.Router();

// make sure to tell router object to use each of the routes we created in routes/apiRoutes folder
router.use(require('./candidateRoutes'));
router.use(require('./partyRoutes'));
router.use(require('./voterRoutes'));
router.use(require('./voteRoutes'));

module.exports = router;
