# Use Ruby 3.1.0 as the base image
FROM ruby:3.1.0

# Install necessary packages
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs wget tar

# Create and set working directory
RUN mkdir /app
WORKDIR /app/graphql

# Copy Gemfile and Gemfile.lock before other files to leverage Docker cache
COPY Gemfile Gemfile.lock ./

# Install bundler and application dependencies
RUN gem install bundler
RUN bundle install --jobs 4 --retry 3

# Copy the rest of the application files
COPY . .

# Install dockerize
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz && \
    chmod +x /usr/local/bin/dockerize

# Bundle install bins
RUN bundle binstubs --all

# Copy database configuration
RUN cp config/database.example.yml config/database.yml

# Set the default command to bash
CMD ["/bin/bash"]
