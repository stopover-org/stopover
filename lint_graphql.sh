#!/bin/bash

cd graphql
bundle exec rubocop --parallel --auto-correct-all --stderr --debug --config ./.rubocop.yml $@
bundle exec bin/rake annotate_models
bundle exec bin/rake annotate_routes
