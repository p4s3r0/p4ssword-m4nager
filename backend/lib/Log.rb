module Log
  COLORS = {
    red: "\e[31m",
    green: "\e[32m",
    yellow: "\e[33m",
    blue: "\e[34m",
    reset: "\e[0m"
  }

  def self.info(message)
    puts "#{COLORS[:blue]}[INFO]#{COLORS[:reset]} #{message}"
  end

  def self.success(message)
    puts "#{COLORS[:green]}[ OK ]#{COLORS[:reset]} #{message}"
  end

  def self.warn(message)
    puts "#{COLORS[:yellow]}[WARN]#{COLORS[:reset]} #{message}"
  end

  def self.error(message)
    puts "#{COLORS[:red]}[ERROR]#{COLORS[:reset]} #{message}"
  end
end