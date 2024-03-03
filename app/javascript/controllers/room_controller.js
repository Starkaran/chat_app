import { Controller } from "@hotwired/stimulus"
import consumer from "channels/consumer"

// Connects to data-controller="room"
export default class extends Controller {
  connect() {
    const room_element = document.getElementById('room-id');
    const room_id = Number(room_element.getAttribute('data-room-id'));

    consumer.subscriptions.subscriptions.forEach((subscription) => {
      consumer.subscriptions.remove(subscription)
      // if(subscription.identifier.channel === "RoomChannel" && subscription.identifier.room_id === room_id){
      // }
    })
    this.sub = this.createActionCableChannel(room_id);
  }

  createActionCableChannel(roomId) {

    return consumer.subscriptions.create({ channel: "RoomChannel", room_id: roomId}, {
      connected() {
        console.log("connected to the room channel", roomId);
        // Called when the subscription is ready for use on the server
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
      },

      received(data) {
        const user_element = document.getElementById('user-id');
        const user_id = Number(user_element.getAttribute('data-user-id'));
        
        let html;
    
        if(user_id === data?.message?.user_id){
          html = data.mine
        } else{
          html = data.theirs
        }
        let messages = document.getElementById('messages');
        if(html !== undefined) messages.innerHTML += html;
      }
    });

  }
}
