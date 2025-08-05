import formData from 'form-data';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

export const config = { api: { bodyParser: false } };

// Ganti dengan kredensial akun kamu
cloudinary.config({
  cloud_name: 'dxrq60isy',
  api_key: '752375273482392',
  api_secret: '@dxrq60isy'
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST' });
  }

  const form = new (await import('formidable')).IncomingForm();
  
  form.parse(req, async (err, fields, files) => {
    if (err || !files.image) return res.status(400).json({ error: 'Invalid upload' });

    const file = files.image;
    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: 'vercel-upload'
      });
      return res.status(200).json({ url: result.secure_url });
    } catch (uploadErr) {
      console.error(uploadErr);
      return res.status(500).json({ error: 'Upload failed' });
    }
  });
}
