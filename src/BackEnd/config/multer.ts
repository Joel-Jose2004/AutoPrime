import multer from "multer";
import path from "path";

// configuração de armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req+""+file)
    cb(null, "uploads/"); // pasta onde será salva
  },
  filename: (req, file, cb) => {
    console.log(req)
    const ext = path.extname(file.originalname);
    const nome = Date.now() + ext;
    cb(null, nome);
  }
});

export const upload = multer({ storage });