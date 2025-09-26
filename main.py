from fastapi import FastAPI, Request

app = FastAPI()

# Test için root endpoint
@app.get("/")
def read_root():
    return {"message": "Railway test başarılı"}

# Webhook test endpoint
@app.post("/webhook")
async def webhook(req: Request):
    data = await req.json()
    print("Gelen veri:", data)  # loglarda görünecek
    return {"status": "ok", "received": data}
