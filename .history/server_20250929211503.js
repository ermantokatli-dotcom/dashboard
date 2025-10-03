import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "F5V4z/N66jjWOUUgi1IuaTOtkvckW6orRaJ3Jzbtzd27hMKgtzV5TuIkJJdFs+JjLGLxexrVud8aigKrClZ7Jfh2nn1uuuxj5UrskgeCD/+cdYBB/hvk/Z/LadHfplT8";

// Proxy endpoint
app.put("/update-status", async (req, res) => {
  const { listId, recordId } = req.body;

  try {
    const response = await fetch(`https://api.workiom.com/api/services/app/Data/UpdatePartial?listId=${listId}&id=${recordId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY,
      },
      body: JSON.stringify({
        "4290991": {
          "id": "6a580124-4295-4a81-a47e-ab4f5f9658c2",
          "label": "ARAÇ BOŞ",
          "order": 0,
          "color": "#5bd77e"
        }
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Proxy hatası" });
  }
});

app.listen(3000, () => {
  console.log("Proxy çalışıyor http://localhost:3000");
});
