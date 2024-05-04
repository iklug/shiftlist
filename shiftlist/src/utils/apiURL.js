const apiURL =
    import.meta.env.MODE === "production"
        ? "https://megabackend.fly.dev"
        : "http://localhost:4000";

export default apiURL;
