// api.models.ts





export interface ApiResponse<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
}

export interface ApiListResponse<T> {
	data: T[];
	success: boolean;
	message?: string;
}
//
