export async function getAll() {
    return fetch("https://start.honotest123.workers.dev/todos/list-all").then(
        async (res) => res.json().then((data) => data.results)
    );
}
