export function GET(
	request: Request,
	{ params }: { params: { userId: string } },
) {
	return Response.json({
		data: {
			id: params.userId,
			name: "John Doe",
			email: "p2EYI@example.com",
			created_at: "2022-02-22T22:22:22.000Z",
		},
	});
}
