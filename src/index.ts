import { Container, getContainer } from '@cloudflare/containers';

export class SearxngContainer extends Container<Env> {
	defaultPort = 8080;
	sleepAfter = '24h';
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);
		const container = getContainer(env.SEARXNG_CONTAINER, `${url.origin}/${request.cf?.colo}`);

		await container.start({
			envVars: {
				SEARXNG_BASE_URL: `${url.origin}/`,
			},
		});

		return container.fetch(request);
	},
} satisfies ExportedHandler<Env>;
