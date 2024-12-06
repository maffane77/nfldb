import requests
from bs4 import BeautifulSoup


class RushingStats:
    def __init__(self):
        self.rush_att = None
        self.rush_yds = None
        self.rush_td = None
        self.rush_first_down = None
        self.rush_success = None
        self.rush_long = None
        self.rush_yds_per_att = None
        self.rush_yds_per_g = None
        self.rush_att_per_g = None

    def __str__(self):
        return (
            f"Rushing Stats:\n"
            f"  Attempts: {self.rush_att}, Yards: {self.rush_yds}, Touchdowns: {self.rush_td}\n"
            f"  First Downs: {self.rush_first_down}, Success: {self.rush_success}, Long: {self.rush_long}\n"
            f"  Yards/Att: {self.rush_yds_per_att}, Yards/Game: {self.rush_yds_per_g}, Attempts/Game: {self.rush_att_per_g}"
        )


class ReceivingStats:
    def __init__(self):
        self.targets = None
        self.rec = None
        self.rec_yds = None
        self.rec_yds_per_rec = None
        self.rec_td = None
        self.rec_first_down = None
        self.rec_success = None
        self.rec_per_g = None
        self.rec_yds_per_g = None
        self.rec_success = None
        self.rec_per_g = None
        self.rec_yds_per_g = None
        self.catch_pct = None
        self.rec_yds_per_tgt = None

    def __str__(self):
        return (
            f"Receiving Stats:\n"
            f"  Targets: {self.targets}, Receptions: {self.rec}, Yards: {self.rec_yds}\n"
            f"  Yards/Rec: {self.rec_yds_per_rec}, Touchdowns: {self.rec_td}, First Downs: {self.rec_first_down}\n"
            f"  Success: {self.rec_success}, Long: {self.rec_long}, Rec/Game: {self.rec_per_g}, Yards/Game: {self.rec_yds_per_g}\n"
            f"  Catch %: {self.catch_pct}, Yards/Target: {self.rec_yds_per_tgt}"
        )


class PassingStats:
    def __init__(self):
        self.qb_rec = None
        self.pass_cmp = None
        self.pass_att = None
        self.pass_cmp_pct = None
        self.pass_yds = None
        self.pass_td = None
        self.pass_td_pct = None
        self.pass_int = None
        self.pass_int_pct = None
        self.pass_first_down = None
        self.pass_success = None
        self.pass_long = None
        self.pass_yds_per_att = None
        self.pass_adj_yds_per_att = None
        self.pass_yds_per_cmp = None
        self.pass_yds_per_g = None
        self.pass_rating = None
        self.qbr = None
        self.pass_sacked = None
        self.pass_net_yds_per_att = None
        self.pass_adj_net_yds_per_att = None
        self.comebacks = None
        self.gwd = None

    def __str__(self):
        return (
            f"Passing Stats:\n"
            f"  QB Record: {self.qb_rec}, Completions: {self.pass_cmp}, Attempts: {self.pass_att}\n"
            f"  Completion %: {self.pass_cmp_pct}, Yards: {self.pass_yds}, TDs: {self.pass_td}, TD %: {self.pass_td_pct}\n"
            f"  INTs: {self.pass_int}, INT %: {self.pass_int_pct}, First Downs: {self.pass_first_down}\n"
            f"  Success: {self.pass_success}, Longest: {self.pass_long}, Yards/Att: {self.pass_yds_per_att}\n"
            f"  Adj Yards/Att: {self.pass_adj_yds_per_att}, Yards/Comp: {self.pass_yds_per_cmp}, Yards/Game: {self.pass_yds_per_g}\n"
            f"  Pass Rating: {self.pass_rating}, QBR: {self.qbr}, Sacks: {self.pass_sacked}\n"
            f"  Net Yards/Att: {self.pass_net_yds_per_att}, Adj Net Yards/Att: {self.pass_adj_net_yds_per_att}\n"
            f"  Comebacks: {self.comebacks}, Game-Winning Drives: {self.gwd}"
        )


class RushRecSeason:
    def __init__(self, year):
        self.year = year
        self.rushing_stats = None
        self.receiving_stats = None

    def __str__(self):
        return (
            f"{self.year} Season:\n" f"{self.rushing_stats}\n" f"{self.receiving_stats}"
        )


class PassingSeason:
    def __init__(self, year):
        self.year = year
        self.passing_stats = None

    def __str__(self):
        return f"{self.year} Season:\n" f"{self.passing_stats}\n"


class Player:
    def __init__(self):
        self.id = None
        self.Name = None
        self.Pos = None
        self.Team = None
        self.rush_rec_seasons = []
        self.passing_seasons = []

    def add_rush_rec_season(self, season):
        self.rush_rec_seasons.append(season)

    def add_passing_season(self, season):
        self.passing_seasons.append(season)

    def __str__(self):
        result = f"Player: {self.Name} Team: {self.Team}\n"
        for season in self.rush_rec_seasons:
            result += str(season) + "\n--------------------------\n"

        if self.passing_seasons:
            for season in self.passing_seasons:
                result += str(season) + "\n--------------------------\n"
        return result
