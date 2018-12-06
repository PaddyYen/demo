export class ChatUser {
	id: number;
	account: string;
	email: string;
	parentId: number;
	password: string;
	description: string;
	phone: string;
	accessToken: string;
	constructor(chatUser: ChatUser = {} as ChatUser) {
		this.id = chatUser.id;
		this.account = chatUser.account;
		this.email = chatUser.email;
		this.parentId =chatUser.parentId;
		this.password = chatUser.password;
		this.description = chatUser.description;
		this.phone = chatUser.phone;
		this.accessToken = chatUser.accessToken;
	}
}
