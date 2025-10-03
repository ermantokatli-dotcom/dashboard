import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Authenticate çağrısından aldığın token
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEzMzQ3MiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImVybWFudG9rYXRsaWJ1c2luZXNzQGdtYWlsLmNvbSIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiS1ZCQkxDT1dRNTdONTQyVzdIRjU0TFJYRVNNRUUyWEUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIxN2UwOTc5MzVlNjA0ZGRjYjZhNzA5NjhkYjJlYzFiMyIsImh0dHA6Ly93d3cuYXNwbmV0Ym9pbGVycGxhdGUuY29tL2lkZW50aXR5L2NsYWltcy90ZW5hbnRJZCI6IjIwOTY5Iiwic3ViIjoiMTMzNDcyIiwianRpIjoiNGE4ZDY5YTItZmNhZC00MDNjLThiZWItZDNkMzM5OWY4YTRjIiwiaWF0IjoxNzU5MTcwOTk4LCJ0b2tlbl92YWxpZGl0eV9rZXkiOiI4Y2RhMGU3Ny0wYjdkLTQ1MTgtOWFlNS0yZjgxZDEzMGY5MmEiLCJ1c2VyX2lkZW50aWZpZXIiOiIxMzM0NzJAMjA5NjkiLCJ0b2tlbl90eXBlIjoiMCIsIm5iZiI6MTc1OTE3MDk5OCwiZXhwIjoxNzYxNzYyOTk4LCJpc3MiOiJMaXN0dXJlIiwiYXVkIjoiTGlzdHVyZSJ9.XYgECapQuKVD3QP8AeKHAGMH85ug-z3a1roMFaZjrzw"; 

app.put("/update-status", async (req, res) => {
  const { listId, recordId } = req.body;

  try {
    const response = await fetch(
      `https://api.workiom.com/api/services/app/Data/UpdatePartial?listId=${listId}&id=${recordId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + ACCESS_TOKEN
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
