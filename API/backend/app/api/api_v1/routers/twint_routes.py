from fastapi import APIRouter, Response
from pydantic import BaseModel
from typing import Optional
import twint


class TwintParams(BaseModel):
    username: Optional[str] = None
    subject: Optional[str] = None
    year: Optional[int] = None
    since: Optional[str] = None  # --since "2015-12-20 20:30:15"
    email: Optional[bool] = False
    phone: Optional[bool] = False
    verified: Optional[bool] = False
    location: Optional[str] = ""  # -g="48.880048,2.385939,1km"
    followers: Optional[bool] = False
    following: Optional[bool] = False
    favorites: Optional[bool] = False
    user_full: Optional[bool] = False
    retweets: Optional[bool] = False
    limit: Optional[int] = 100


twint_router = r = APIRouter()


@r.post("/osint/social-analyser")
def use_twint(tp: TwintParams):
    if tp.username == "" and tp.subject == "" and tp.location == "":
        return Response("Error, the username, subject or location is required.", 401)

# TODO: implementer Search, Followers et Lookup => https://github.com/twintproject/twint/wiki/Scraping-functions
    c = twint.Config()
    c.Username = tp.username
    c.Search = tp.subject
    c.Geo = tp.location
    c.Year = tp.year
    c.Since = tp.since
    c.Email = tp.email
    c.Phone = tp.phone
    c.Verified = tp.verified
    c.Followers = tp.followers
    c.Following = tp.following
    c.Favorites = tp.favorites
    c.User_full = tp.user_full
    c.Retweets = tp.retweets
    c.Limit = tp.limit

    return twint.run.Search(c)
