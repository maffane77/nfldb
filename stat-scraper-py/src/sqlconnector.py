import mysql.connector
import playerClass as pc


db = mysql.connector.connect(
    host="localhost", user="root", password="", database="nfldb"
)

cursor = db.cursor()


def insertIfNotFound(player):
    exists = check_exists(player.id)

    if exists is False:
        insert_query = """
        INSERT INTO players (player_id, name, position, currentTeam)
        VALUES (%s, %s, %s, %s)
        
        """

        cursor.execute(insert_query, (player.id, player.Name, player.Pos, player.Team))
        db.commit()
        print(f"{player.Name} inserted in the database!")

    else:
        print(f"{player.Name} already exists in the database.")


def check_exists(playerHref):
    query_check = "SELECT player_id FROM players WHERE player_id = %s"

    cursor.execute(query_check, (playerHref,))
    result = cursor.fetchone()

    if result is None:
        return False
    else:
        return True


def check_exists_rush_season(player, season):

    query_check = "SELECT player_id, season FROM rushing_stats WHERE player_id = %s AND season = %s"

    cursor.execute(query_check, (player.id, season.year))
    result = cursor.fetchone()

    if result is None:
        return False
    else:
        return True


def check_exists_pass_season(player, season):

    query_check = "SELECT player_id, season FROM passing_stats WHERE player_id = %s AND season = %s"

    cursor.execute(query_check, (player.id, season.year))
    result = cursor.fetchone()

    if result is None:
        return False
    else:
        return True


def check_exists_rec_season(player, season):

    query_check = "SELECT player_id, season FROM receiving_stats WHERE player_id = %s AND season = %s"

    cursor.execute(query_check, (player.id, season.year))
    result = cursor.fetchone()

    if result is None:
        return False
    else:
        return True


def ensure_valid_data(value):
    # If the value is empty or None, return None (or 0 if preferred)
    if value is None or value == "":
        return None
    try:
        return float(value)  # Convert to float if possible
    except ValueError:
        return None  # If conversion fails, return None


def insert_receiving_stats(player_id, season_year, receiving_stats):
    # Get the attributes of the receiving_stats instance
    attributes = vars(receiving_stats)

    # Prepare the values for insertion
    values = [player_id, season_year]

    # Loop through the attributes and check their validity before adding them
    for attr in attributes.values():
        values.append(ensure_valid_data(attr))

    # SQL Insert query
    insert_query = """
        INSERT INTO receiving_stats (player_id, season, Tgt, Rec, Yds, `Y/R`, TD, `1D`, `Succ%`, `R/G`, `Y/G`, `Ctch%`, `Y/Tgt`)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    # Execute the insert query with the prepared values
    cursor.execute(insert_query, tuple(values))
    db.commit()


def insert_rushing_stats(player_id, season_year, rushing_stats):
    attributes = vars(rushing_stats)

    columns = [
        "player_id",
        "season",
        "Att",
        "Yds",
        "TD",
        "1D",
        "Succ%",
        "Lng",
        "Y/A",
        "Y/G",
        "A/G",
    ]

    values = [player_id, season_year]
    for attr in attributes.values():
        values.append(ensure_valid_data(attr))

    insert_query = """
        INSERT INTO rushing_stats (player_id, season, Att, Yds, TD, `1D`, `Succ%`, Lng, `Y/A`, `Y/G`, `A/G`)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    cursor.execute(insert_query, tuple(values))
    db.commit()


def insert_passing_stats(player_id, season_year, passing_stats):
    attributes = vars(passing_stats)

    values = [player_id, season_year]

    for attr in attributes.values():
        values.append(ensure_valid_data(attr))

    insert_query = """
        INSERT INTO passing_stats (player_id, season, QBrec, Cmp, Att, `Cmp%`, Yds, TD, `TD%`, `INT`, `INT%`, `1D`, 
                                  `Succ%`, Lng, `Y/A`, `AY/A`, `Y/C`, `Y/G`, Rate, QBR, Sk, `NY/A`, `ANY/A`, `4QC`, GWD)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    cursor.execute(insert_query, tuple(values))
    db.commit()


def insert_player_stats(player):
    for season in player.rush_rec_seasons:
        # Insert rushing stats
        if not check_exists_rush_season(player, season):
            print("Inserting rush stats...")
            insert_rushing_stats(player.id, season.year, season.rushing_stats)
        # Insert receiving stats
        if not check_exists_rec_season(player, season):
            print("Inserting receiving stats...")
            insert_receiving_stats(player.id, season.year, season.receiving_stats)

    for season in player.passing_seasons:
        # Insert passing stats
        if not check_exists_pass_season(player, season):
            print("Inserting passing stats...")
            insert_passing_stats(player.id, season.year, season.passing_stats)
