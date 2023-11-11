<script lang="ts">
    import { onMount } from 'svelte'
    import { getUsers } from '$lib/firebase'

    let users: any[] = []

    onMount(async () => {
        users = await getUsers()
    })
</script>

<main class="card w-4/6 bg-neutral text-neutral-content mx-auto">
    <div class="card-body items-center text-center">
        <button class="btn btn-primary">
            <a href="/login">Login</a>
        </button>
    </div>
    <div class="card-body flex flex-col items-center justify-center">
        <h3 class="card-title text-3xl mb-6">Browse our users</h3>
        <ul class="flex flex-wrap justify-center">
            {#each users as user (user.username)}
                <li
                    class="p-4 m-4 flex flex-col items-center bg-neutral-light rounded-lg shadow-2xl border-double border-4 border-lime-900"
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
