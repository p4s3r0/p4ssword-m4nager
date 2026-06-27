require 'csv'

namespace :db_migration do
  desc "Migrate data from old Postgres database to new database"
  task migrate_users: :environment do
    import_users
  end

  task migrate_folders: :environment do
    import_folders
  end

  task migrate_passwords: :environment do
    import_passwords
  end

  task migrate_tfas: :environment do
    import_tfas
  end

  def import_tfas
    file_path = Rails.root.join("lib", "tasks", "import_data", "two_fa.csv")

    stats = {
      total: 0,
      created: 0,
      existed: 0,
      errors: 0
    }

    algorithms = {
      NULL: 0,
      SHA256: 1
    }

    CSV.foreach(file_path, headers: true) do |row|
      Log.info("Importing tfa: #{row["name"]}")
      stats[:total] += 1

      unless User.find_by(username: row["user"])
        Log.error("User not found: #{row["user"]}")
        stats[:errors] += 1
        next
      end

      if Tfa.exists?(name: row["name"], user: User.find_by(username: row["user"]))
        stats[:existed] += 1
        Log.warn("Tfa already exists: #{row["name"]} for user #{row["user"]}")
        next
      end

      tfa = Tfa.new(name: row["name"], user: User.find_by(username: row["user"]), algorithm: algorithms[row["algo"].to_sym], enc_secret: row["secret"])
      tfa.save!
      stats[:created] += 1
      Log.success("Tfa imported successfully: #{row["name"]}")
    end

    Log.success("Migration completed.")
    Log.warn("total: #{stats[:total]}")
    Log.warn("created: #{stats[:created]}")
    Log.warn("existed: #{stats[:existed]}")
    Log.warn("errors: #{stats[:errors]}")
  end

  def import_passwords
    file_path = Rails.root.join("lib", "tasks", "import_data", "passwords.csv")

    stats = {
      total: 0,
      created: 0,
      existed: 0,
      errors: 0
    }

    CSV.foreach(file_path, headers: true) do |row|
      Log.info("Importing passwords: #{row["name"]}")
      stats[:total] += 1

      unless User.find_by(username: row["user"])
        Log.error("User not found: #{row["user"]}")
        stats[:errors] += 1
        next
      end


      if Password.exists?(name: row["name"], user: User.find_by(username: row["user"]))
        Log.warn("Password already exists: #{row["name"]}")
        stats[:existed] += 1
        next
      end

      password = Password.new(
        user: User.find_by(username: row["user"]),
        name: row["name"],
        enc_username: row["username"],
        enc_password: row["password"],
        enc_note: row["notes"],
        folder: Folder.find_by(name: row["folder"]),
        starred: row["starred"] == "True")
      password.save!
      stats[:created] += 1
      Log.success("Folder imported successfully: #{row["folder"]}")
    end

    Log.success("Migration completed.")
    Log.warn("total: #{stats[:total]}")
    Log.warn("created: #{stats[:created]}")
    Log.warn("existed: #{stats[:existed]}")
    Log.warn("errors: #{stats[:errors]}")
  end

  def import_folders
    file_path = Rails.root.join("lib", "tasks", "import_data", "folders.csv")

    stats = {
      total: 0,
      created: 0,
      existed: 0,
      errors: 0
    }

    CSV.foreach(file_path, headers: true) do |row|
      Log.info("Importing folders: #{row["folder"]}")
      stats[:total] += 1

      unless User.find_by(username: row["user"])
        Log.error("User not found: #{row["user"]}")
        stats[:errors] += 1
        next
      end


      if Folder.exists?(name: row["folder"], user: User.find_by(username: row["user"]))
        Log.warn("Folder already exists: #{row["folder"]} for user #{row["user"]}")
        stats[:existed] += 1
        next
      end

      colors = {
        black: "#FFC107",
        darkRed: "#FF5722",
        red: "#F44336",
        darkOrange: "#FF9800",
        lightOrange: "#FFAB40",
        yellow: "#FFEB3B",
        lightGreen: "#8BC34A",
        green: "#4CAF50",
        blueGreen: "#00BCD4",
        blue: "#2196F3",
        violet: "#9C27B0"
      }

      folder = Folder.new(name: row["folder"], starred: row["starred"] == "True", color: colors[row["color"].to_sym], user: User.find_by(username: row["user"]))
      folder.save!
      stats[:created] += 1
      Log.success("Folder imported successfully: #{row["folder"]}")
    end

    Log.success("Migration completed.")
    Log.warn("total: #{stats[:total]}")
    Log.warn("created: #{stats[:created]}")
    Log.warn("existed: #{stats[:existed]}")
    Log.warn("errors: #{stats[:errors]}")
  end

  def import_users
    file_path = Rails.root.join("lib", "tasks", "import_data", "users.csv")
    stats = {
      total: 0,
      created: 0,
      existed: 0
    }

    CSV.foreach(file_path, headers: true) do |row|
      Log.info("Importing user: #{row["username"]}")
      stats[:total] += 1
      if User.exists?(username: row["username"])
        stats[:existed] += 1
        Log.warn("User already exists: #{row["username"]}")
        next
      end

      user = User.new(username: row["username"], email: row["email"], password: row["password"])
      user.save!(validate: false)
      stats[:created] += 1
      Log.success("User imported successfully: #{row["username"]}")
    end

    Log.success("Migration completed.")
    Log.warn("total: #{stats[:total]}")
    Log.warn("created: #{stats[:created]}")
    Log.warn("existed: #{stats[:existed]}")
  end
end