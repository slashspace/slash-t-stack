// Common types used across the application

export interface User {
	id: string;
	email: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface BaseEntity {
	id: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface PaginationParams {
	page: number;
	limit: number;
}
