<script lang="ts">
    import {
        user,
        userData,
        signOutSSR,
        signInWithGoogle,
        registerWithEmail,
        signInWithEmail,
    } from '$lib/firebase'

    $: href = `/${$userData?.username}/edit`

    let email: string
    let password: string
    let isRegistering = false

    async function handleEmailAuth() {
        try {
            if (isRegistering) {
                await registerWithEmail(email, password)
            } else {
                await signInWithEmail(email, password)
            }
        } catch (error: any) {
            console.error('Email authentication failed:', error.message)
        }
    }
</script>

{#if $user}
    <h2 class="card-title">Welcome {$user.displayName || ''}</h2>
    <p class="text-center text-success">You are logged in</p>
    <button class="btn btn-warning" on:click={signOutSSR}>Sign out</button>
    <a href="/login/username" class="btn btn-primary mt-10"> Choose your username</a>
    <a {href} class="btn btn-info mt-10"> Edit your profile </a>
{:else}
    <button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
    <form
        class="flex flex-col items-center m-4 mt-20 w-96"
        on:submit|preventDefault={handleEmailAuth}
    >
        <h3>{isRegistering ? 'Register with Email' : 'Login with Email'}</h3>

        <label class="m-2" for="email">Email:</label>
        <input class="m-2 w-full p-1" type="email" id="email" bind:value={email} required />

        <label class="m-2" for="password">Password:</label>
        <input
            class="m-2 w-full p-1"
            type="password"
            id="password"
            bind:value={password}
            required
        />

        <button type="submit" class="btn btn-success mt-3 w-32 text-center">
            {isRegistering ? 'Register' : 'Login'}
        </button>
    </form>

    <p class="mt-3">
        {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
    </p>
    <button class="btn" on:click={() => (isRegistering = !isRegistering)}>
        {isRegistering ? 'Login instead' : 'Register instead'}
    </button>
{/if}
