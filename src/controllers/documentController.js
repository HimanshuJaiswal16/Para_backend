const db = require('../config/database');

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { type } = req.body;
    const userId = req.user.id;
    const filePath = req.file.path;

    const validTypes = ['aadhar', 'pan', 'birth', 'pension'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid document type' });
    }

    const [result] = await db.query(
      'INSERT INTO documents (user_id, type, file_path) VALUES (?, ?, ?)',
      [userId, type, filePath]
    );

    res.status(201).json({
      message: 'Document uploaded successfully',
      documentId: result.insertId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDocuments = async (req, res) => {
  try {
    const userId = req.user.id;
    const [documents] = await db.query(
      'SELECT * FROM documents WHERE user_id = ?',
      [userId]
    );

    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDocumentByType = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type } = req.params;

    const [documents] = await db.query(
      'SELECT * FROM documents WHERE user_id = ? AND type = ?',
      [userId, type]
    );

    if (documents.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json(documents[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
  getDocumentByType
};