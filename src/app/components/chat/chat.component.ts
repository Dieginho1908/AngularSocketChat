import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  mensajesSubscription: Subscription;
  mensajes: any[] = [];

  elemento: HTMLElement; // obtiene la posición del último mensaje (focus)


  constructor(
    public wsChat: ChatService
  ) { }

  ngOnInit() {

    this.elemento = document.getElementById('chat-mensajes');


    this.mensajesSubscription = this.wsChat.getMessages().subscribe( msg => {

      // Se utiliza para que mantenga el focus en el último elemento
      setTimeout( () => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);


      this.mensajes.push( msg );


    });

  }

  ngOnDestroy() {
    this.mensajesSubscription.unsubscribe();
  }

  enviar() {

    if( this.texto.trim().length === 0) {
      return;
    }

    this.wsChat.sendMessage(this.texto);
    this.texto = '';

  }

}
