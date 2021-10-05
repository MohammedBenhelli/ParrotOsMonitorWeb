from fastapi import APIRouter
from pydantic import BaseModel
from importlib import import_module


class SocialParams(BaseModel):
    username: str
    websites: str


social_analyser_router = r = APIRouter()


@r.post("/osint/social-analyser")
def use_social_analyser(sp: SocialParams):
    SocialAnalyzer = import_module("social-analyzer").SocialAnalyzer(silent=True)
    return SocialAnalyzer.run_as_object(username=sp.username, websites=sp.websites, silent=True)
