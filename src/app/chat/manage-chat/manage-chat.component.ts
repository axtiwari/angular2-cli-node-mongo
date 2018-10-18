import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { ChatService } from '../chat.service';

@Component({
	selector: 'manage-chat',
	templateUrl: './manage-chat.component.html',
	styleUrls: ['./manage-chat.component.scss']
})
export class ManageChatComponent implements OnInit {


	public message: Message;
	public messages: Message[] = [];
	private context = {};

	constructor(private chatService: ChatService) { }

	ngOnInit() {
		this.enviarMsg('', this.context);
		this.observarChatMessage();
	}

	observarChatMessage(): any {

		this.chatService.chatMessage$.subscribe(msg => {
			console.log('Mensagem recebida VIA SERVICE:', msg);

			// TODO: enviar mensagem via servico
			let avatarImg = 'assets/img/user.png';
			let mensagem = new Message(msg, avatarImg, new Date(), 'text');
			this.messages.push(mensagem);
			this.enviarMsg(msg, this.context);
		})
	}

	mensagemEnviada(args) {

		console.log('Mensagem recebida no manage:', args);

		// TODO: enviar mensagem via servico
		let avatarImg = args.from === 'user' ? 'assets/img/user.png' : 'assets/img/bot.png';
		let msg = new Message(args.message, avatarImg, new Date(), 'text');
		this.messages.push(msg);
		this.enviarMsg(args.message, this.context);
	}

	public enviarMsg(msg, context) {
		console.log('enviarMsg msg:', msg);
		console.log('enviarMsg context:', context);

		this.chatService.sendMessage(msg, context).subscribe(
			(res: any) => {
				console.log('resposta: ', res);
				this.context = res.context;

				res.messages.forEach(message => {
					this.messages.push(
						new Message(message.text || message.title, 'assets/img/bot.png', new Date(), message.response_type, message.options)
					);
				});

			});
	}

}
