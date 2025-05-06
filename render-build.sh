#!/usr/bin/env bash

# Install Python and pip
apt-get update && apt-get install -y python3 python3-pip

# Install yt-dlp globally for Python 3
pip3 install yt-dlp

# Proceed with Node dependencies
npm install
