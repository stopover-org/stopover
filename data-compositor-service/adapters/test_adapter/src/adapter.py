from playwright.async_api import async_playwright
from neo4j import GraphDatabase


class Adapter:

    def __init__(self, neo4j_uri, neo4j_user, neo4j_password):
        self.neo4j_driver = GraphDatabase.driver(neo4j_uri, auth=(neo4j_user, neo4j_password))

    async def scrape(self, url):
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
                        """, title=title_text, url=title_url, parent_url=url, source='viator')

            await browser.close()

    def close(self):
        self.neo4j_driver.close()
