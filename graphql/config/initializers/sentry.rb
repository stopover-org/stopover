Sentry.init do |config|
    config.dsn = 'https://7d3942c461ca408d94118dd25518f6bb@o4505569844723712.ingest.sentry.io/4505569846951936'
    config.breadcrumbs_logger = [:active_support_logger, :http_logger]

    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
    config.traces_sample_rate = 1.0
    # or
    config.traces_sampler = lambda do |context|
        true
    end
end
