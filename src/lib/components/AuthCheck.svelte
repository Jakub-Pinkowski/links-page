<script lang="ts">
    import { user } from '$lib/firebase'
</script>

{#if $user}
    <slot />
{:else}
    <p class="text-center text-danger">
        You are not logged in
        <a class="btn btn-primary" href="login">Sign in</a>
    </p>
{/if}
