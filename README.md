# React + Vite

https://vitejs.dev/

Also used:
react router (https://reactrouter.com/en/main/start/tutorial)

mui (https://mui.com/material-ui/getting-started/installation/)

icons
https://mui.com/material-ui/material-icons/

figmae:
https://www.figma.com/file/UYHeq7eVGjTXWQ0YReLLql/Shmartaf?type=design&node-id=0-1&mode=design&t=6EdiyQFwkzwTAGUw-0

dont forget to change URL AND PORT!

I had to allow CORS so changed the app.py

import uvicorn
from database.database import Database
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
------ADD THIS ------
from fastapi.middleware.cors import CORSMiddleware

---

from router import babysitter, certifications, parent, requirements, users

from database.models import Base

app = FastAPI(
debug=True,
title="Shmartaf App",
description="This is a simple babysitter app",
version="0.1",
)
------AND THIS -----
app.add_middleware(
CORSMiddleware,
allow_origins=["*"], # Set this to your frontend URL in production
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

diffrent routes for parent / babysitter
fetch babysitters from API
