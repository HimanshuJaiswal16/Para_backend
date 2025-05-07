const db = require('../config/database');
const crypto = require("crypto"); // Import crypto module

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    console.log(req.body, req.user.id, req.file.path, ">>>reqqqq")
    const { type } = req.body;
    const userId = req.user.id;
    const filePath = req.file.path;

    const validTypes = ['aadhar', 'pan', 'driving_license', 'voter_id'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid document type' });
    }

    const [documents] = await db.query(
      'SELECT * FROM documents WHERE user_id = ? AND type = ?',
      [userId,type]
    );

    console.log(documents, ">>>documents row");


    if(documents.length>0){
      await db.query(
        'DELETE FROM documents WHERE user_id = ? AND type = ?',
        [userId, type]
      );
    }

    const document_id = crypto.randomUUID(); 
    let createDate = new Date();

    console.log(userId, type, filePath, document_id, createDate,">>>>fafadsf")
    const [result] = await db.query(
      'INSERT INTO documents (user_id, type, file_path, document_id) VALUES (?, ?, ?, ?)',
      [userId, type, filePath, document_id]
    ).catch(error => {
      console.error("Error inserting document:", error);
    });


    res.status(201).json({
      message: 'Document uploaded successfully',
      documentId: document_id // Return document_id in response
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

    console.log(documents)

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
      [userId,type]
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
