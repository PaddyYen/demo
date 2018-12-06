export class MUser {
	name?:string;
	afName?:string;
	password_hash?:string;
	creation_ts?:Date;
	isGuset?:boolean;

	constructor(mUser: MUser = {} as MUser) {
		this.name = mUser.name;
		this.afName = mUser.afName;
		this.password_hash = mUser.password_hash;
		this.creation_ts = mUser.creation_ts;
		this.isGuset = mUser.isGuset;
	}
}