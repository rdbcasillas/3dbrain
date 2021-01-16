#!/bin/bash
sed -i.bk -e "1s/ ${2}-L/LeftCount/" -e "1s/ ${2}-R/RightCount/" -e "1s/ ${2}-Tot/TotalCount/" $1 
