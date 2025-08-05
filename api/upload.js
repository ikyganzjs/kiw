import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const form = formidable({ multiples: false, uploadDir: './public/uploads', keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err || !files.image) {
      return res.status(400).json({ error: 'File upload failed' });
    }

    const file = files.image;
    const filename = path.basename(file.filepath);
    const url = `/public/uploads/${filename}`;
    return res.status(200).json({ url });
  });
}
