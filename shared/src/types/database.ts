// Database-related types

export interface DatabaseConfig {
	host: string;
	port: number;
	database: string;
	username: string;
	password: string;
	ssl?: boolean;
}

export interface QueryOptions {
	limit?: number;
	offset?: number;
	orderBy?: string;
	orderDirection?: "asc" | "desc";
}

export interface DatabaseConnection {
	isConnected: boolean;
	lastConnected?: Date;
}
