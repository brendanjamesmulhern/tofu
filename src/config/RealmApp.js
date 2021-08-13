import * as Realm from 'realm-web';

const RealmApp = () => {
	const app = new Realm.App({ id: "tofu-pzxdb" });
	return app;
};

export default RealmApp;