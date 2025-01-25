from bs4 import BeautifulSoup
import re
import argparse
import json

# URL to scrape
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options


# Helper functions
def calculate_day(left_percentage):
    """Calculate the day based on the left percentage."""
    day_index = int(float(left_percentage) // 20)
    days_map = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    return days_map[day_index] if 0 <= day_index < len(days_map) else "Unknown"

def extract_style_value(style, key):
    """Extract numerical value from a style string."""
    match = re.search(rf"{key}([\d.]+)", style)
    return float(match.group(1)) if match else None



# Set up WebDriver
def parse_site(link):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(link)

    # Wait for the `time_block` elements to load (adjust timeout as needed)
    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "time_block"))
        )
        html = driver.page_source
    except Exception as e:
        print("Failed to load time blocks:", e)
    finally:
        driver.quit()
    driver.quit()

    # Parse HTML with BeautifulSoup
    soup = BeautifulSoup(html, "html.parser")

    # Extract the toptime value
    hour_marker_tag = soup.find("div", class_="hour_marker")
    if hour_marker_tag:
        toptime = int(hour_marker_tag.text.strip())
    else:
        print("hour_marker not found.")

    # Initialize the classes dictionary
    classes = {}

    # Process the time blocks
    blocks = soup.find_all("div", class_=lambda x: x and x.startswith("time_block"))

    for block in blocks:
        # Extract class name
        class_name_tag = block.find("span", class_="nonmobile")
        if not class_name_tag:
            continue
        class_name = class_name_tag.get_text(" ", strip=True).replace("<br>", " ")

        # Extract and calculate data from styles
        style = block.get("style", "")
        left = extract_style_value(style, "left: ")
        top = extract_style_value(style, "top: ")
        height = extract_style_value(style, "height: ")
        padding_top = extract_style_value(style, "padding-top: ")

        if left is None or top is None or height is None or padding_top is None:
            continue

        day = calculate_day(left)
        starttime = int(top - 35)/32 + toptime + .5
        length = int((height + padding_top + 9))/32

        # Add data to classes dictionary
        if class_name not in classes:
            classes[class_name] = {"days": [], "starttime": starttime, "length": length}

        # Append the day to the list of days
        classes[class_name]["days"].append(day)

    return classes

def main():
    print(parse_site("https://vsb.mcgill.ca/vsb/criteria.jsp?access=0&lang=en&tip=1&page=results&scratch=0&term=202501&sort=none&filters=iiiiiiiii&bbs=&ds=&cams=Distance_Downtown_Macdonald_Off-Campus&locs=any&isrts=&course_0_0=COMP-303&sa_0_0=&cs_0_0=--202501_1801--&cpn_0_0=&csn_0_0=&ca_0_0=&dropdown_0_0=al&ig_0_0=0&rq_0_0=&course_1_0=COMP-551&sa_1_0=&cs_1_0=--202501_1822--&cpn_1_0=&csn_1_0=&ca_1_0=&dropdown_1_0=al&ig_1_0=0&rq_1_0=&course_2_0=MATH-358&sa_2_0=&cs_2_0=--202501_3154--&cpn_2_0=&csn_2_0=&ca_2_0=&dropdown_2_0=al&ig_2_0=0&rq_2_0=&course_3_0=MATH-357&sa_3_0=&cs_3_0=--202501_3153--&cpn_3_0=&csn_3_0=&ca_3_0=&dropdown_3_0=al&ig_3_0=0&rq_3_0=&course_4_0=GEOG-314&sa_4_0=&cs_4_0=--202501_2748-2750-&cpn_4_0=&csn_4_0=&ca_4_0=&dropdown_4_0=al&ig_4_0=0&rq_4_0="))

if __name__ == "__main__":
    main()
