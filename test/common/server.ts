import {
	HttpServer
} from 'http-server';

export class Server extends HttpServer {

	static readonly defaultPort = 3000;

	constructor(options: any = {
		root: '.'
	}) {
		super(options);
	}

	listen(port = Server.defaultPort) {
		return new Promise((resolve) => {
			super.listen(port, resolve);
		});
	}

	close() {
		super.close();
	}
}

if (process.argv.indexOf(__filename) === process.argv.length - 1) {
	new Server().listen();
}
