#!/bin/bash

cd app
npm run typecheck

cd ../graphql
bundle exec rubocop --parallel --auto-correct-all --stderr --debug --config ./.rubocop.yml $@
