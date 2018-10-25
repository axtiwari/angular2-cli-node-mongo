import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message';
import { ConstantPool } from '@angular/compiler';
import { ChatService } from '../chat.service';

@Component({
	selector: 'message-item',
	templateUrl: './message-item.component.html',
	styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {

	@Input('message')
	public message: Message;

	constructor(private chatService: ChatService) { }

	ngOnInit() { }

	selectOption(option) {
		this.chatService.selectMessage(option);
	}
}
