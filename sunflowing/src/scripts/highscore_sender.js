//@ts-nocheck

export class HighscoreSender {
	constructor() {
		const API_BASE_URL = window.location
			.toString()
			.substring(0, window.location.toString().indexOf('sunflowing/'));
		this.API_ENDPOINT_POST_HIGHSCORE = API_BASE_URL + 'highscore';
		console.log('initing HighscoreSender', TelegramGameProxy.initParams);
	}

	async get_scores() {
		return this.get(
			`${this.API_ENDPOINT_POST_HIGHSCORE}?chat=${TelegramGameProxy.initParams.chat}&user=${TelegramGameProxy.initParams.user}` +
				`&message=${TelegramGameProxy.initParams.message}&inline=${TelegramGameProxy.initParams.inline}`
		);
	}

	get_anti_cheat_token(counter, user, chat) {
		return (chat - user - counter * 286) % 98765;
	}

	send_score(counter) {
		const anti_cheat_token = this.get_anti_cheat_token(
			counter,
			TelegramGameProxy.initParams.user,
			TelegramGameProxy.initParams.chat
		);
		this.post(this.API_ENDPOINT_POST_HIGHSCORE, {
			score: counter,
			chat: TelegramGameProxy.initParams.chat,
			user: TelegramGameProxy.initParams.user,
			message: TelegramGameProxy.initParams.message,
			inline: TelegramGameProxy.initParams.inline,
			instance: TelegramGameProxy.initParams.instance,
			anti_cheat_token: anti_cheat_token,
		});
	}

	post(url, data) {
		var xhr = new XMLHttpRequest();
		console.log(`posting score to url ${url}`, data);
		xhr.onload = function () {
			if (xhr.status == 200) {
				console.log('posted score successfully');
			} else {
				try {
					console.error('posting score seemed to fail', JSON.parse(xhr.responseText));
				} catch (error) {
					console.error('posting score seemed to fail', xhr.responseText);
				}
			}
		};
		xhr.open('POST', url, true);
		xhr.send(JSON.stringify(data));
	}

	async get(url) {
		const response = await fetch(url);
		return response.json();
	}
}
