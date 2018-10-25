import { Component, EventEmitter, Output } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
	selector: 'message-form',
	templateUrl: './message-form.component.html',
	styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent {

	public message = '';

	@Output()
	mensagemEnviada: EventEmitter<any> = new EventEmitter<any>();

	constructor(private chatService: ChatService) { }

	public sendMessage(): void {
		this.chatService.selectMessage(this.message);
		this.message = '';
	}
}
