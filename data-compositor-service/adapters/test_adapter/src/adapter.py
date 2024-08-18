import json
import socket

from confluent_kafka import Producer
from playwright.async_api import async_playwright
from neo4j import GraphDatabase


class Adapter:

    def __init__(self, neo4j_config, kafka_config):
        self.neo4j_driver = GraphDatabase.driver(
            neo4j_config["uri"],
            auth=(neo4j_config["user"], neo4j_config["password"])
        )
        self.kafka_config = kafka_config
        if kafka_config.get('user'):
            self.kafka_producer = Producer({
                'bootstrap.servers': kafka_config.get("servers"),
                'sasl.username': kafka_config.get("user"),
                'sasl.password': kafka_config.get("password"),

                'security.protocol': 'PLAINTEXT',
            })

        else:
            self.kafka_producer = Producer({
                'bootstrap.servers': kafka_config.get("servers"),
                'client.id': socket.gethostname(),

                'security.protocol': 'PLAINTEXT',
            })

    async def scrape(self, url, task_id):
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            await page.goto(url)
            await page.wait_for_selector('.card-body h4 a.title')

            product_titles = await page.query_selector_all('.card-body h4 a.title')

            with self.neo4j_driver.session() as session:
                for title in product_titles:
                    title_text = await title.inner_text()
                    title_url = await title.get_attribute('href')
                    session.run("""
                        CREATE (n:Url {
                            title: $title,
                            url: $url,
                            parent_url: $parent_url,
                            source: $source
                        })
                    """, title=title_text, url=title_url, parent_url=url, source='test')

            self.publish_to_kafka("data-compositor", "test_adapter", {"task_id": task_id, "url": url})

            await browser.close()

    def publish_to_kafka(self, topic, key, value):
        try:
            self.kafka_producer.produce(topic, key=key, value=json.dumps(value).encode('utf-8'))
            # self.kafka_producer.flush()
            print(f"Message published to topic {topic}: {key} -> {value}")
        except Exception as e:
            print(f"Failed to publish message: {e}")

    def close(self):
        self.neo4j_driver.close()
