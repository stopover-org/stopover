from fastapi import FastAPI
from fastapi.responses import JSONResponse
import os
from src.adapter import Adapter

app = FastAPI()


@app.get("/")
async def root():
    neo4j_uri = os.environ['NEO4J_URI']
    neo4j_user = os.environ['NEO4J_USER']
    neo4j_password = os.environ['NEO4J_PASSWORD']
    url = "https://webscraper.io/test-sites/e-commerce/allinone"

    adapter = Adapter(neo4j_uri, neo4j_user, neo4j_password)
    await adapter.scrape(url)
    adapter.close()
    return JSONResponse(status_code=200, content={"message": "Scraping completed successfully"})
