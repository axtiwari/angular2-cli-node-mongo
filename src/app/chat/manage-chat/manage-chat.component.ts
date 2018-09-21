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
	}

	mensagemEnviada(args) {

		console.log('Mensagem recebida no manage:', args);

		// TODO: enviar mensagem via servico
		let avatarImg = args.from === 'user' ? 'assets/img/user.png' : 'assets/img/bot.png';
		let msg = new Message(args.message, avatarImg, new Date());
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
				this.messages.push(
					new Message(res.output.text, 'assets/img/bot.png', new Date())
				);
			});
	}

}
