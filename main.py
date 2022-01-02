import requests
import json
import uvicorn
from typing import Optional
from pydantic import BaseModel
import aiohttp
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import (
    FastAPI, WebSocket, WebSocketDisconnect, Request, Response
)

templates = Jinja2Templates(directory="templates")


class Search(BaseModel):
    name: str


app = FastAPI()


@app.post("/se/")
async def search_words(item: Search):
    print(item.name)
    searchkey = item.name

    app_id = "61b0914c"
    app_key = "c3025a6a93bb6fbdad52a5bc489e04eb"
    endpoint = "entries"
    language_code = "en-us"
    word_id = searchkey
    url = "https://od-api.oxforddictionaries.com/api/v2/" + endpoint + "/" + language_code + "/" + word_id.lower()

    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers={"app_id": app_id, "app_key": app_key}) as response:
            r = await response.json()
            return r


@app.get("/")
def get_home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


app.mount("/static", StaticFiles(directory="static"), name="static")



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
