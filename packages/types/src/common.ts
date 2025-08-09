// Common types used across the application
export interface BaseEntity {
	id: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface PaginationParams {
	page: number;
	limit: number;
}
