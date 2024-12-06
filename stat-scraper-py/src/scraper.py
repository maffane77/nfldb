from time import sleep
from bs4 import BeautifulSoup as bs
import requests
import lxml
import playerClass as pc
import concurrent.futures
from itertools import cycle
import sqlconnector as sq
from collections import deque


ref_link = "https://www.pro-football-reference.com"
proxies = []

with open("proxyscrape_premium_http_proxies.txt", "r") as f:
    proxies = f.read().split("\n")


# prox_queue = deque(proxies)


def full_scrape():
    """
    Performs full scrape of the webpage.
    """
    response = requests.get(ref_link + "/players/")
    soup = bs(response.text, "lxml")
    playerHrefs = []

    index_list = soup.find("ul", class_="page_index")
    letterHrefList = []
    for item in index_list:
        letterHref = item.a["href"]
        letterHrefList.append(letterHref)

    limit = 0
    for item in letterHrefList:
        limit = limit + 1
        playerHrefs.extend(letterIndexScrape(item))

    players = []
    while playerHrefs:
        currentHrefBuffer = playerHrefs[:10]
        playerHrefs = playerHrefs[10:]

        for Href in currentHrefBuffer:
            print(Href)
            player = fetchPlayerData(proxies, Href)
            print("--------------------------------------------\n")


def check_position_and_year(playerPosYear):
    positions = ["QB", "RB", "WR", "TE"]
    if any(position in playerPosYear[0] for position in positions):
        if int(playerPosYear[1].split("-")[0]) >= 2005:
            return True
    else:
        return False


def letterIndexScrape(letterHref):
    """
    Scrapes each unique letter webpage with href "players/?" with ? being a letter.
    Checks if position is in list of valid offensive positions.
    Returns list of href links for each individual player page
    """
    response = requests.get(ref_link + letterHref)
    soup = bs(response.text, "lxml")
    playerHrefsList = []

    letter_index_list = soup.find("div", class_="section_content").find_all("p")
    for item in letter_index_list:
        text = item.text
        playerPosYear = text.split(") ")
        playerHref = item.find("a")["href"]
        if check_position_and_year(playerPosYear):
            playerHrefsList.append(playerHref)

    print(f"Scraped {len(playerHrefsList)} player ref links from {letterHref}")
    return playerHrefsList


def normalize_pos(string):
    positions = ["QB", "RB", "WR", "TE"]
    for pos in positions:
        if pos in string:
            return pos


def fetchPlayerData(proxy_pool, player_href):
    if not sq.check_exists(player_href.split("/")[3].split(".")[0]):
        print("Skipping...player already exists.")
    else:
        while proxy_pool:
            proxy = proxy_pool.pop(0)
            proxy_pool.append(proxy)

            print(f"Trying proxy {proxy}")
            try:
                # Attempt to scrape data for the player using the proxy
                player = individualPlayerScrape(player_href, proxy)
                print(f"Successfully scraped data for {player.Name} with proxy {proxy}")
                sq.insertIfNotFound(player)
                sq.insert_player_stats(player)
                print(f"Successfully inserted player stats for {player.Name}")

                return player
            except requests.exceptions.ProxyError as e:
                # Handle ProxyError (failed to connect to the proxy)
                print(f"ProxyError with {proxy}: {e}")
            except requests.exceptions.RequestException as e:
                print(f"RequestException with {proxy}: {e}")
            except AttributeError as e:
                print("This player could not be scraped.")
                break
            except Exception as e:
                print(f"Unexpected error with {proxy} scraping {player_href}: {e}")
                break
            except IndexError as e:
                print(f"Unexpected list index error... Skipping this player: {e}")
                break

            print("Retrying with next proxy...\n")

        print(f"All proxies failed for {player_href}")
        return None  # If all proxies fail, return None


def individualPlayerScrape(playerHref, proxy):
    response = requests.get(
        ref_link + playerHref, proxies={"http": proxy, "https": proxy}
    )
    soup = bs(response.text, "lxml")

    player = pc.Player()
    playerID = playerHref.split("/")[3].split(".")[0]
    player.id = playerID
    playerInfo = soup.find("div", id="info")
    player.Name = playerInfo.find("h1").find("span").text.strip()
    player.Pos = playerInfo.find_all("p")[1].text.split(" ")[1].replace("\n", "")
    player.Pos = normalize_pos(player.Pos)
    player.Team = playerInfo.find("a", href=lambda x: x and "teams" in x).text

    rush_rec_rows = soup.find_all(
        "tr", id=lambda x: x and "rushing_and_receiving.20" in x and " " not in x
    )
    rush_rec_rows.extend(
        soup.find_all(
            "tr", id=lambda x: x and "receiving_and_rushing.20" in x and " " not in x
        )
    )
    passing_rows = soup.find_all(
        "tr", id=lambda x: x and "passing.20" in x and " " not in x
    )

    rec_valid_attributes = vars(pc.ReceivingStats()).keys()
    rush_valid_attributes = vars(pc.RushingStats()).keys()
    pass_valid_attributes = vars(pc.PassingStats()).keys()
    for row in rush_rec_rows:
        seasonYear = row.find(attrs={"data-stat": "year_id"}).find("a").text
        rr_season = pc.RushRecSeason(seasonYear)
        rush_stats = pc.RushingStats()
        rec_stats = pc.ReceivingStats()

        for key in rush_valid_attributes:
            stat = row.find(attrs={"data-stat": key})
            if stat:
                stat = stat.text
                setattr(rush_stats, key, stat)
        rr_season.rushing_stats = rush_stats

        for key in rec_valid_attributes:
            stat = row.find(attrs={"data-stat": key})
            if stat:
                stat = stat.text
                setattr(rec_stats, key, stat)
        rr_season.receiving_stats = rec_stats

        player.add_rush_rec_season(rr_season)

    if passing_rows:
        for row in passing_rows:
            seasonYear = row.find(attrs={"data-stat": "year_id"}).find("a").text
            p_season = pc.PassingSeason(seasonYear)
            pass_stats = pc.PassingStats()

            for key in pass_valid_attributes:
                stat = row.find(attrs={"data-stat": key})
                if stat:
                    stat = stat.text
                    setattr(pass_stats, key, stat)
            p_season.passing_stats = pass_stats

            player.add_passing_season(p_season)

    return player


players = full_scrape()

# fetchPlayerData(proxies, "/players/A/AlleJo02.htm")
# print(player)
