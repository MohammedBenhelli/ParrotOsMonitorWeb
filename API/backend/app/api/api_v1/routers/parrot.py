from fastapi import APIRouter, Request, Depends, Response, encoders
from pydantic import BaseModel
import docker

class Cmd(BaseModel):
    cmd: str

parrot_router = r = APIRouter()

@r.post("/parrot/cmd")
def exec_cmd(cmd: Cmd):
    client = docker.from_env()
    parrotContainer = client.containers.get('parrot')
    return parrotContainer.exec_run(cmd.cmd)