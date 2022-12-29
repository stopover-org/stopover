# frozen_string_literal: true

class EventSupport
  def self.prepare_dates(event, dates = [])
    return nil unless event.is_a? Event

    case event.recurring_type
    when 'recurring'
      regexp = /([1-7])\s+([0-2][0-9]):([0-5][0-9])/

      dates.map do |date|
        day, hours, minutes = date.match(regexp).captures
        day = day.to_i
        hours = hours.to_i
        minutes = minutes.to_i
        return nil if day > 7 || day < 1
        return nil if hours > 12 || hours.negative?
        return nil if minutes > 59 || minutes.negative?

        return "#{day.to_s.rjust(1, '0')} #{hours.to_s.rjust(2, '0')}:#{minutes.to_s.rjust(1, '0')}"
      end
    when 'non_recurring'
      regexp = /(\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]))\s+([0-2][0-9]):([0-5][0-9])/

      dates.map do |date|
        date, hours, minutes = date.match(regexp).captures
        date = Date.parse date
        hours = hours.to_i
        minutes = minutes.to_i
        return nil if date <= Time.zone.today
        return nil if hours > 12 || hours.negative?
        return nil if minutes > 59 || minutes.negative?

        return "#{date} #{hours.to_s.rjust(2, '0')}:#{minutes.to_s.rjust(1, '0')}"
      end
    end
  end

  def self.schedule(event)
    ::Configuration.get_value('SCHEDULE_DAYS_IN_ADVANCE').value.to_i.times do |i|
      date = Time.zone.now + i.days
      next unless event.reload.check_date(date)

      times = event.reload.get_time(date)
      times.each do |time|
        time = time.split(':')
        new_date = date.change({ hour: time[0].to_i, min: time[1].to_i })
        next if event.schedules.where(scheduled_for: new_date).any?
        event.schedules.create!(scheduled_for: new_date)
      end
    end
  end
end
