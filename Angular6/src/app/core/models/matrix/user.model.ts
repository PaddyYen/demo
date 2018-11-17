export class m_User {
	name?:string;
	afName?:string;
	password_hash?:string;
	creation_ts?:Date;
	isGuset?:boolean;

	constructor(mUser: m_User = {} as m_User) {
		this.name = mUser.name;
		this.afName = mUser.afName;
		this.password_hash = mUser.password_hash;
		this.creation_ts = mUser.creation_ts;
		this.isGuset = mUser.isGuset;
	}
}