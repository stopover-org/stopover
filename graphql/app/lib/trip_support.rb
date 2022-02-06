# frozen_string_literal: true

class TripSupport
  def self.prepare_dates(trip, dates = [])
    return nil unless trip.is_a? Trip

    case trip.recurring_type
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
        return nil if date <= Date.today
        return nil if hours > 12 || hours.negative?
        return nil if minutes > 59 || minutes.negative?

        return "#{date} #{hours.to_s.rjust(2, '0')}:#{minutes.to_s.rjust(1, '0')}"
      end
    end
  end
end
