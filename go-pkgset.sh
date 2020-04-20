#!/bin/bash

#######################################
##       source ./go-pkgset.sh       ##
#######################################


### load the script/gvm
[[ -s "$GVM_ROOT/scripts/gvm" ]] && source "$GVM_ROOT/scripts/gvm"
echo "starting to switch the go version and go pkgset ......"

go_version=$(sed -n 1p .go-version)
#echo "select the version of Golang:  $go_version"

go_pkgset=$(sed -n 1p .go-pkgset)
#echo "select the pkgset of Golang:  $go_pkgset"

gvm use "$go_version"
target_pkgset=$(gvm pkgset list | grep "$go_pkgset")

if [[ $target_pkgset =~ $go_pkgset ]]; then
    echo "$go_pkgset pkgset has been created"
else
    echo "going to create the pkgset for $go_pkgset"
    gvm pkgset create "$go_pkgset"
fi

gvm pkgset use "$go_pkgset"
gvm pkgset list

echo "=======  switch successfully  ======="