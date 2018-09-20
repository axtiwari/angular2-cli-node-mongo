import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message';
import { ChatService } from '../chat.service';

@Component({
	selector: 'message-form',
	templateUrl: './message-form.component.html',
	styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {

	@Input('message')
	private message: Message;

	@Input('messages')
	private messages: Message[];

	private context = {};

	constructor(private chatService: ChatService) { }

	ngOnInit() {
		this.enviarMsg('', this.context);
	}

	public sendMessage(): void {
		this.message.timestamp = new Date();
		this.messages.push(this.message);

		this.enviarMsg(this.message.content, this.context);

		this.message = new Message('', 'assets/img/user.png');
	}

	public enviarMsg(msg, context) {
		this.chatService.sendMessage(msg, context).subscribe(
			(res: any) => {
				console.log('resposta: ', res);
				this.context = res.context;
				this.messages.push(
					new Message(res.output.text, 'assets/img/bot.png', new Date())
				);
			});
	}
}
