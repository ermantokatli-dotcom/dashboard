import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Buraya Authentication’dan aldığın accessToken'ı yapıştır
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; 

app.put("/update-status", async (req, res) => {
  const { listId, recordId } = req.body;

  try {
    const response = await fetch(
      `https://api.workiom.com/api/services/app/Data/UpdatePartial?listId=${listId}&id=${recordId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + ACCESS_TOKEN, // ✅ artık token
        },
        body: JSON.stringify({
          "4290991": {
            "id": "6a580124-4295-4a81-a47e-ab4f5f9658c2",
            "label": "ARAÇ BOŞ",
            "order": 0,
            "color": "#5bd77e"
          }
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Proxy hatası" });
  }
});

app.listen(3000, () => {
  console.log("✅ Proxy çalışıyor: http://localhost:3000");
});
