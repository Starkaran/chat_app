class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_channel_#{params[:room_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def get_user_data
    user = {
      id: current_user.id,
      email:  current_user.email,
      username: current_user.email.split('@')[0],
    }

    ActionCable.server.broadcast("room_channel_#{params[:room_id]}", { user: user })
  end
end
