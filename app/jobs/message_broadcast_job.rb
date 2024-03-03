class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    mine = MessagesController.render(partial: 'messages/mine', locals: { message: message })
    theirs = MessagesController.render(partial: 'messages/theirs', locals: { message: message })

    ActionCable.server.broadcast("room_channel_#{message.room_id}", { mine: mine, theirs: theirs, message: message })
  end
end
