export default () => ({
	port: Number.parseInt(process.env.PORT, 10) || 8080,
});
