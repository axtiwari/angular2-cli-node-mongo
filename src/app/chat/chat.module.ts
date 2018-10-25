import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';

import { ManageChatComponent } from './manage-chat/manage-chat.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageItemComponent } from './message-item/message-item.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { ChatService } from './chat.service';
import { ChatRoutingModule } from './chat.routing';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		ChatRoutingModule,
		AgmCoreModule.forRoot({
			apiKey: 'API_KEY'
		})
	],
	declarations: [ManageChatComponent, MessageListComponent, MessageItemComponent, MessageFormComponent],
	providers: [
		ChatService
	]

})
export class ChatModule { }
