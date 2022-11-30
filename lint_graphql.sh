#!/bin/bash

cd graphql
bundle exec rubocop --parallel --auto-correct --stderr --debug $@
