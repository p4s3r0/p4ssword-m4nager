class SessionTracker
  STORE_PATH = Rails.root.join("storage", "active_sessions.json")

  def self.track(user, session_id, request)
    return unless user && session_id

    sessions = load_sessions
    user_id = user.id.to_s
    sessions[user_id] ||= {}
    
    sessions[user_id][session_id] = {
      user_agent: request.user_agent,
      ip_address: request.remote_ip,
      last_active_at: Time.current,
      username: user.username
    }

    # Clean up old sessions (e.g., older than 30 days)
    sessions[user_id].delete_if { |_, data| Time.parse(data[:last_active_at]) < 30.days.ago } rescue nil

    save_sessions(sessions)
  end

  def self.for_user(user)
    return [] unless user
    sessions = load_sessions
    user_sessions = sessions[user.id.to_s] || {}
    user_sessions.map do |session_id, data|
      data.merge(session_id: session_id)
    end
  end

  def self.clear_all(user)
    return unless user
    sessions = load_sessions
    sessions.delete(user.id.to_s)
    save_sessions(sessions)
  end

  def self.remove_session(user, session_id)
    return unless user && session_id
    sessions = load_sessions
    if sessions[user.id.to_s]
      sessions[user.id.to_s].delete(session_id)
      save_sessions(sessions)
    end
  end

  private

  def self.load_sessions
    if File.exist?(STORE_PATH)
      JSON.parse(File.read(STORE_PATH)).with_indifferent_access
    else
      {}
    end
  rescue
    {}
  end

  def self.save_sessions(sessions)
    FileUtils.mkdir_p(File.dirname(STORE_PATH))
    File.write(STORE_PATH, JSON.pretty_generate(sessions))
  end
end
