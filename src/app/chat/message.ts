export class Message {
	content: string;
	timestamp: Date;
	avatar: string;
	response_type: string;
	options: any[];

	constructor(content: string, avatar: string, timestamp: Date, type: string, options?: any[]) {
		this.content = content;
		this.timestamp = timestamp;
		this.avatar = avatar;
		this.response_type = type;
		this.options = options;
	}
}
