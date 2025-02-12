const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.post(
  '/upload',
  auth,
  upload.single('document'),
  documentController.uploadDocument
);

router.get('/', auth, documentController.getDocuments);
router.get('/:type', auth, documentController.getDocumentByType);

module.exports = router;