import { component$ } from "@builder.io/qwik";
import { TestComponent } from "~/integrations/react/TestComponent";

export default component$(() => {
    return (
        <div>
            <h1>Hello from React</h1>
            <TestComponent client:load />
        </div>
    );
});
