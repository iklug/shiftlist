const apiURL =
    import.meta.env.MODE === "production"
        ? "https://megabackend.fly.dev"
        : "http://localhost:8080";

export default apiURL;
