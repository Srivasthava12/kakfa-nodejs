import fs from 'fs';
import express from 'express'

interface Router {
    build: (app: express.Application) => void;
    importRouter: (routeFilePath: string) => any;
  }

export const Router = {
	build(app): void {
		const routes = fs
			.readdirSync(__dirname)
			.filter((file) => file !== 'index.ts')
			.filter((file) => file.match(/^(?!.*\.test\.ts$).*\.ts$/))
			.map((file) => file.split('.')[0]);
			
		routes.forEach((route: string) => {
			app.use(`/${route}`, this.importRouter(`./${route}.ts`));
		});
	},
	importRouter(routeFilePath: string): any {
		return require(routeFilePath);
	}
};
