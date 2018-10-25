import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { ChatService } from '../chat.service';
import { AuthService } from '../../authentication/auth.service';

@Component({
	selector: 'manage-chat',
	templateUrl: './manage-chat.component.html',
	styleUrls: ['./manage-chat.component.scss']
})
export class ManageChatComponent implements OnInit {


	public message: Message;
	public messages: Message[] = [];
	public intents = [];
	private context = {};

	public title: string = 'My first AGM project';
	public lat: number = -3.8070516999999997;
	public lng: number = -38.5272278;
	public lat2: number = -3.742439;
	public lng2: number = -38.482030;
	public lat3: number = -3.737162;
	public lng3: number = -38.497578;
	showMaps = false;


	constructor(private chatService: ChatService, private authService: AuthService) { }

	ngOnInit() {
		this.context = { nome_usuario: this.authService.getUserName() };
		this.enviarMsg('', this.context);
		this.observarChatMessage();
	}

	observarChatMessage(): any {

		this.chatService.chatMessage$.subscribe(msg => {
			let avatarImg = 'assets/img/user.png';
			let mensagem = new Message(msg, avatarImg, new Date(), 'text');
			this.messages.push(mensagem);

			this.enviarMsg(msg, this.context);
		})
	}

	public enviarMsg(msg, context) {
		console.log('enviarMsg msg:', msg);
		console.log('enviarMsg context:', context);

		msg = this.tratarMensagem(msg) || msg;

		this.chatService.sendMessage(msg, context).subscribe(
			(response: any) => {
				console.log('resposta: ', response);
				this.context = response.context;
				this.intents = response.intents;

				this.tratarResposta(response);

				response.messages.forEach(message => {


					this.messages.push(
						new Message(message.text || message.title,
							'assets/img/bot.png',
							new Date(),
							message.response_type,
							message.options)
					);
				});

			});
	}

	tratarResposta(response: any): any {
		if (response.intents.some(i => i.intent == 'procurarAgenciaProxima')) {
			this.showMaps = true;
		}
	}

	tratarMensagem(msg: any): any {

		if (this.intents.some(i => i.intent == 'InfoGeraisBeneficios')) {
			switch (msg) {
				case 'Aposentadoria':
					return 'infoBeneficioAposentadoria';
				case 'Pensão':
					return 'infoBeneficioPensao';
				case 'Salário Maternidade':
					return 'infoBeneficioSalMaternidade';
			}
		}
	}

}
