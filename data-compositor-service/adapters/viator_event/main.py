import json
import os
import asyncio
from src.adapter import ViatorScraper

def lambda_handler(event, context):
    neo4j_uri = os.environ['NEO4J_URI']
    neo4j_user = os.environ['NEO4J_USER']
    neo4j_password = os.environ['NEO4J_PASSWORD']
    url = os.environ['URL']

    scraper = ViatorScraper(neo4j_uri, neo4j_user, neo4j_password)
    asyncio.run(scraper.scrape_viator(url))
    scraper.close()

    return {
        'statusCode': 200,
        'body': json.dumps('Scraping completed successfully')
    }
