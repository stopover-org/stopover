FROM ruby:3.1.0

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN mkdir /app
WORKDIR /app/graphql

COPY . .

RUN gem install bundler

RUN bundle install

RUN bundle binstubs --all

RUN cp config/database.example.yml config/database.yml

CMD ["/bin/bash"]
