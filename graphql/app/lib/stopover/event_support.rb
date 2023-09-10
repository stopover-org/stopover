# frozen_string_literal: true

module Stopover
  class EventSupport
    def self.prepare_dates(event_type, dates = [])
      case event_type
      when 'recurrent'
        # Monday 23:34
        regexp = /([a-zA-Z]+)\s+([0-2][0-9]):([0-5][0-9])/

        dates.map do |date|
          day, hours, minutes = date.match(regexp).captures
          day = day
          hours = hours.to_i
          minutes = minutes.to_i
          return nil unless %w[sunday monday tuesday wednesday thursday friday saturday].include?(day.downcase)
          return nil if hours > 24 || hours.negative?
          return nil if minutes > 59 || minutes.negative?

          "#{day} #{hours.to_s.rjust(2, '0')}:#{minutes.to_s.rjust(1, '0')}"
        end
      when 'non_recurrent'
        # 30/06/2023 09:10
        regexp = %r{(\d{2})/(\d{2})/(\d{4})\s+(\d{2}):(\d{2})}

        dates.map do |date|
          day, month, year, hours, minutes = date.match(regexp).captures
          year    = year.to_i
          month   = month.to_i
          day     = day.to_i
          hours   = hours.to_i
          minutes = minutes.to_i

          DateTime.new(year, month, day, hours, minutes).to_time
        end
      end
    end

    def self.schedule(event)
      ::Configuration.get_value('SCHEDULE_DAYS_IN_ADVANCE').value.to_i.times do |i|
        date = Time.zone.now + i.days
        break if event.end_date && event.end_date < date

        times = event.reload.get_time(date) || []
        dates_with_time = times.map do |time|
          time = time.split(':')

          date.change({ hour: time[0].to_i, min: time[1].to_i })
        end

        event.schedules
             .active
             .where('scheduled_for::DATE = ?', date.to_date)
             .where.not(scheduled_for: dates_with_time)
             .each do |schedule|
          schedule.destroy if schedule.bookings.empty?
        end

        should_create_schedules = event.reload.check_date(date)
        next unless should_create_schedules

        dates_with_time.each do |date_with_time|
          next if event.schedules.active.where(scheduled_for: date_with_time).any?
          event.schedules.create!(scheduled_for: date_with_time)
        end
      end
    end
  end
end
