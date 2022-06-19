interface PaginationResponse<T> {
  rows: T[];
  count: number;
}

export { PaginationResponse };
