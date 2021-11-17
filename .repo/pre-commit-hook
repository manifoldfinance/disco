#!/bin/bash

function diff() {
FILES=$(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g')
[ -z "$FILES" ] && exit 0
}

function diffsearch() {
for commit in $(git rev-list --all); do 
    # search only lines starting with + or -
    if  git show "$commit" | grep "^[+|-].*search-string"; then 
        git show --no-patch --pretty=format:'%C(yellow)%h %Cred%ad %Cblue%an%Cgreen%d %Creset%s' --date=short $commit
    fi  
done
}

function main() {
  diffsearch
  diff
}

main
