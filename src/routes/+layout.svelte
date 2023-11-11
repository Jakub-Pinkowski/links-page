<script lang="ts">
    import '../app.css'
</script>

<div class="min-h-screen flex flex-col">
    <slot class="flex-grow" />
    <footer class="footer items-center p-4 bg-neutral text-neutral-content mt-auto">
        <p>© 2023 Jakub Pinkowski</p>
        <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <a href="https://github.com/Jakub-Pinkowski">
                <img class="w-7" src="github_icon.png" alt="github" />
            </a>
        </nav>
    </footer>
</div>
