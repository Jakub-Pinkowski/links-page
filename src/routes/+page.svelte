<script lang="ts">
    import { onMount } from 'svelte'
    import { getUsers } from '$lib/firebase'

    let users: any[] = []

    onMount(async () => {
        users = await getUsers()
    })
</script>

<main class="card w-4/6 bg-neutral text-neutral-content mx-auto">
    <div class="card-body items-center text-center justify-center">
        <h1 class="card-title text-5xl mb-6">Welcome to Links-Page!</h1>
        <h2 class="text-l mb-6">
            Discover the simplicity of Links-Page, your go-to platform for consolidating and sharing
            all your essential links in one place. Streamline your online presence, just like
            Linktree, and effortlessly connect with your audience across various platforms. Elevate
            your link-sharing experience with Links-Page – where simplicity meets efficiency for
            managing your digital identity. Made with SvelteKit
        </h2>
    </div>
    <div class="card-body items-center text-center">
        <a class="btn btn-primary" href="/login">Login</a>
        <span class="text-l text-violet-500"> Set up your own link page </span>
    </div>
    <div class="card-body flex flex-col items-center justify-center">
        <h3 class="card-title text-3xl mb-6">Browse our users</h3>
        <ul class="flex flex-wrap justify-center">
            {#each users as user (user.username)}
                <li
                    class="p-4 m-4 flex flex-col items-center bg-neutral-light rounded-lg shadow-2xl shadow-neutral-500 hover:shadow-2xl hover:shadow-neutral-700 transition-all duration-500"
                >
                    <a href={`/${user.username}`}>
                        <img
                            src={user.photoURL || '/user.png'}
                            alt={`Photo of ${user.username}`}
                            class="rounded-full mb-2 w-52 h-auto"
                        />
                        <span class="text-lg font-semibold text-center">{user.username}</span>
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</main>
