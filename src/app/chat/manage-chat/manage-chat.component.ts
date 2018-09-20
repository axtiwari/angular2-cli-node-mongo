import { Component, OnInit } from '@angular/core';
import { Message } from '../message';

@Component({
	selector: 'manage-chat',
	templateUrl: './manage-chat.component.html',
	styleUrls: ['./manage-chat.component.scss']
})
export class ManageChatComponent {

	public message: Message;
	public messages: Message[];


	constructor() {
		this.message = new Message('', 'assets/img/user.png');
		this.messages = [
			new Message('Welcome to chatbot universe', 'assets/img/bot.png', new Date())
		];
	}

}
