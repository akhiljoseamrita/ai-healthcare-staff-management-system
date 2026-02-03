import asyncio
from playwright.async_api import async_playwright
import os

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Go to landing page
        await page.goto("http://localhost:5173")
        await page.wait_for_selector("h1:has-text('Welcome to the Staff Portal')")
        await page.screenshot(path="verification/landing_page_final.png")
        print("Captured landing_page_final.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
