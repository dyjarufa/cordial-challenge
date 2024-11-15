import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(bodyParser.json());

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  preferredTime: string;
  specialInstructions?: string;
}

app.post('/submit', (req: Request, res: Response) => {
  const data: FormData = req.body;

  fs.readFile('data.json', 'utf8', (err, content) => {
    let parsedData: FormData[] = [];
    if (!err && content) {
      parsedData = JSON.parse(content);
    }

    parsedData.push(data);

    fs.writeFile('data.json', JSON.stringify(parsedData, null, 2), err => {
      if (err) {
        console.error('Error when trying save data:', err);
        res.status(500).json({ message: 'Error when trying save data' });
      } else {
        res.status(200).json({ message: 'Form data saved successfully' });
      }
    });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
