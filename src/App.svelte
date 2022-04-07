<script lang="ts">
	import ModeSwitcher from "./ModeSwitcher.svelte";
	import Tailwindcss from "./Tailwindcss.svelte";
	import { Router, Route } from "svelte-routing";
	import Home from "./routes/Home.svelte";
	import Download from "./routes/Download.svelte";
	import Wiki from "./routes/Wiki.svelte";
	import NavBar from "./components/NavBar.svelte";
	import Footer from "./components/Footer.svelte";
	const isGithubPages = false; // put it in true when you are deploying to a github pages URL
	const webpageGithub = "venom-page";
	export let url: string;
	let basepath = isGithubPages ? `/${webpageGithub}/` : "";
</script>

<svelte:head />
<Tailwindcss />
<ModeSwitcher />
<main>
	<div class="flex flex-col h-screen">
		<div class="flex-grow">
			<Router {url} {basepath}>
				<NavBar />
				<div class="mt-6">
					<Route path="/" component={Home} />
					<Route path="/downloads" component={Download} />
					<Route path="/wiki" component={Wiki} />
				</div>
			</Router>
		</div>

		<Footer />
	</div>
</main>
