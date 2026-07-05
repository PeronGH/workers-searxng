import { Container, getRandom } from '@cloudflare/containers';

const CONTAINER_POOL_SIZE = 20;

export class SearxngContainer extends Container<Env> {
	defaultPort = 8080;
	sleepAfter = '10m';
	envVars = {
		GRANIAN_HOST: '0.0.0.0',
		GRANIAN_PORT: '8080',
		SEARXNG_BASE_URL: 'https://workers-searxng.workers.dev/',
		SEARXNG_LIMITER: 'false',
		SEARXNG_PUBLIC_INSTANCE: 'false',
	};
}

export default {
	async fetch(request, env): Promise<Response> {
		const container = await getRandom(env.SEARXNG_CONTAINER, CONTAINER_POOL_SIZE);

		return container.fetch(request);
	},
} satisfies ExportedHandler<Env>;
