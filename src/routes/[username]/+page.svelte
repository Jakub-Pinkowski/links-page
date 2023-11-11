<script lang="ts">
    import type { PageData } from './$types'
    import Userlink from '$lib/components/UserLink.svelte'
    import { user, userData } from '$lib/firebase'

    export let data: PageData
</script>

<svelte:head>
    <title>{data.username} Links</title>
    <meta name="description" content={data.bio} />
</svelte:head>

<main class="prose text-center mx-auto mt-8">
    <h1 class="text-5xl m-6 text-primary">
        {data.username}
    </h1>

    <img src={data.photoURL ?? '/user.png'} alt="photoURL" width="256" class="mx-auto" />

    <p class="text-xl my-8">{data.bio ?? 'no bio yet...'}</p>
    <ul class="list-none">
        {#each data.links as item}
            <li class="m-4">
                <Userlink {...item} />
            </li>
        {/each}
    </ul>

    {#if $user && $userData?.username === data.username}
        <a class="btn btn-primary mt-20" href="/{data.username}/edit">Edit your profile</a>
    {/if}
</main>
