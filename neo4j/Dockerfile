FROM neo4j:4.4

# Create the plugins directory
RUN mkdir -p /plugins

# Install the APOC library for the Neo4j 4.4 series
RUN apt-get update && apt-get install -y wget \
    && wget -O /plugins/apoc-4.4.0.8-all.jar https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases/download/4.4.0.8/apoc-4.4.0.8-all.jar

# Copy the custom configuration file
COPY neo4j.conf /var/lib/neo4j/conf/neo4j.conf
