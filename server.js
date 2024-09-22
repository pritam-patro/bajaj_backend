// server.js (Backend)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

const PORT = process.env.PORT || 5000;

// Helper function to process data
function processData(data) {
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
  const highestLowercase = alphabets
    .filter(item => item === item.toLowerCase())
    .sort()
    .reverse()[0] || null;

  return { numbers, alphabets, highestLowercase };
}

// POST Method Route
app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      user_id: "john_doe_17091999",
      is_success: false,
      message: "Invalid data format",
    });
  }

  const { numbers, alphabets, highestLowercase } = processData(data);

  let fileValid = false;
  let fileMimeType = null;
  let fileSizeKb = 0;

  if (file_b64) {
    try {
      const fileBuffer = Buffer.from(file_b64, 'base64');
      fileSizeKb = fileBuffer.length / 1024;
      fileValid = true;
      fileMimeType = 'image/png';  // You can implement file type detection here
    } catch (error) {
      fileValid = false;
    }
  }

  res.json({
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKb.toFixed(2)
  });
});

// GET Method Route
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
