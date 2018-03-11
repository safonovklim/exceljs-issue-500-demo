#!/usr/bin/env bash

while ! echo exit 0 | nc localhost $1; do sleep 10; done
