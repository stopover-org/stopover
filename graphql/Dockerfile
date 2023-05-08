FROM ruby:3.0.4
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /app
WORKDIR /app/graphql

COPY ./Gemfile* .
COPY ./config/database.yml ./config/database.yml

RUN gem install bundler

RUN bundle install

RUN bundle binstubs --all

#RUN bundle exec rake db:schema:load
CMD ["/bin/bash"]