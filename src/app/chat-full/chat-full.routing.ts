import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManageChatComponent } from './manage-chat/manage-chat.component';

@NgModule({
	imports: [
		RouterModule.forChild([{
			path: 'chat-full',
			component: ManageChatComponent
		}])
	],
	exports: [
		RouterModule
	]
})
export class ChatFullRoutingModule { }
