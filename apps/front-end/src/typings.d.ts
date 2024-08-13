declare module "*.svg";
declare module "*.png";
declare module "*.css";

export interface ApiError {
	statusCode?: number;
	message: string;
}
