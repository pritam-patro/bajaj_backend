const express = require('express');
const router = express.Router();
const { validateFile } = require('./fileUtils');

// GET endpoint
router.get('/', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST endpoint
router.post('/', (req, res) => {
  const { data, file_b64 } = req.body;

  const user_id = 'abc_0808080'; // example user ID
  const email = 'pp00597@srmist.edu.in';
  const roll_number = 'RA2111003010041';

  const numbers = [];
  const alphabets = [];
  let highest_lowercase_alphabet = '';

  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: 'Invalid data format' });
  }

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === 'string' && /^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (item === item.toLowerCase() && item > highest_lowercase_alphabet) {
        highest_lowercase_alphabet = item;
      }
    }
  });

  const fileDetails = validateFile(file_b64);

  res.json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highest_lowercase_alphabet ? [highest_lowercase_alphabet] : [],
    file_valid: fileDetails.isValid,
    file_mime_type: fileDetails.mimeType,
    file_size_kb: fileDetails.sizeKb,
  });
});

module.exports = router;